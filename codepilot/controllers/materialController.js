import { Material } from '../models/Material.js'
import { MATERIAL_TYPE_VALUES } from '../shared/materialTypes.js'

function toStudioSummary(material) {
  return {
    id: material._id,
    type: material.type,
    title: material.title,
    language: material.language,
    status: material.status,
    updatedAt: material.updatedAt,
    publishedAt: material.publishedAt,
  }
}

// Loads a material and checks ownership, writing the appropriate error
// response itself. Returns the document, or null if it already responded.
async function loadOwnedMaterial(req, res) {
  const material = await Material.findById(req.params.id)
  if (!material) {
    res.status(404).json({ error: 'material not found' })
    return null
  }
  if (String(material.author) !== req.session.userId) {
    res.status(403).json({ error: 'you do not own this material' })
    return null
  }
  return material
}

// GET /api/materials/studio
// Everything the Studio dashboard needs in one call: verification/account
// context, real stats, and the lecturer's own material list — same
// Promise.all-aggregation shape as profileController.getProfile /
// homeController.getHome.
export async function getStudio(req, res) {
  const authorId = req.session.userId

  const [materials] = await Promise.all([Material.find({ author: authorId }).sort('-updatedAt')])

  const published = materials.filter((m) => m.status === 'published')
  const drafts = materials.filter((m) => m.status === 'draft')

  res.json({
    lecturerVerified: req.currentUser.lecturerVerified,
    name: req.currentUser.name,
    university: req.currentUser.university,
    stats: {
      publishedCount: published.length,
      draftCount: drafts.length,
    },
    materials: materials.map(toStudioSummary),
  })
}

// GET /api/materials/:id
// Fetch one own material regardless of status — the edit form's own
// pre-fill fetch, since GET /library/:id (below) 404s on drafts by design.
export async function getOwnMaterial(req, res) {
  const material = await loadOwnedMaterial(req, res)
  if (!material) return
  res.json({ material })
}

// POST /api/materials  { type, title, content?, externalUrl?, language? }
// Always starts as a draft — publishing is a separate, explicit action so
// the verified-gate check has exactly one enforcement point.
export async function createMaterial(req, res) {
  const { type, title, content, externalUrl, language } = req.body

  if (!MATERIAL_TYPE_VALUES.includes(type)) {
    return res.status(400).json({ error: 'invalid material type' })
  }
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'title is required' })
  }

  try {
    const material = await Material.create({
      author: req.session.userId,
      type,
      title: title.trim(),
      content,
      externalUrl,
      language,
      status: 'draft',
    })
    res.status(201).json({ material })
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message })
    }
    throw err
  }
}

// PUT /api/materials/:id  { title?, content?, externalUrl?, language? }
// Never accepts `status` here — publish/unpublish are the only ways it
// changes, so the verified-gate check can't be bypassed through an edit.
export async function updateMaterial(req, res) {
  const material = await loadOwnedMaterial(req, res)
  if (!material) return

  const { title, content, externalUrl, language } = req.body
  if (title !== undefined) material.title = title.trim()
  if (content !== undefined) material.content = content
  if (externalUrl !== undefined) material.externalUrl = externalUrl
  if (language !== undefined) material.language = language

  try {
    await material.save()
    res.json({ material })
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message })
    }
    throw err
  }
}

// POST /api/materials/:id/publish
// The one real enforcement point for the verified-lecturer gate — a
// disabled Publish button client-side is UX only, this is what actually
// stops an unverified lecturer's material from going live.
export async function publishMaterial(req, res) {
  const material = await loadOwnedMaterial(req, res)
  if (!material) return

  if (!req.currentUser.lecturerVerified) {
    return res.status(403).json({ error: "Your lecturer account isn't verified yet — publishing is disabled until then." })
  }

  material.status = 'published'
  material.publishedAt = new Date()
  await material.save()
  res.json({ material })
}

// POST /api/materials/:id/unpublish
// Leaves publishedAt as-is (a historical "first published on" record)
// rather than clearing it.
export async function unpublishMaterial(req, res) {
  const material = await loadOwnedMaterial(req, res)
  if (!material) return

  material.status = 'draft'
  await material.save()
  res.json({ material })
}

// DELETE /api/materials/:id
export async function deleteMaterial(req, res) {
  const material = await loadOwnedMaterial(req, res)
  if (!material) return

  await Material.findByIdAndDelete(material._id)
  res.status(204).end()
}

// GET /api/materials/library?type=&language=
// Published-only, open to any authenticated user (student or lecturer).
export async function getLibrary(req, res) {
  const { type, language } = req.query
  const query = { status: 'published' }
  if (type && MATERIAL_TYPE_VALUES.includes(type)) query.type = type
  if (language && language !== 'all') query.language = language

  const materials = await Material.find(query).sort('-publishedAt').populate('author', 'name university')

  res.json({
    materials: materials.map((m) => ({
      id: m._id,
      type: m.type,
      title: m.title,
      language: m.language,
      publishedAt: m.publishedAt,
      authorName: m.author?.name || 'Unknown',
      authorUniversity: m.author?.university || '',
    })),
  })
}

// GET /api/materials/library/:id
// A draft is never viewable through this route even if its id is known —
// the one real access-control rule here.
export async function getLibraryMaterial(req, res) {
  const material = await Material.findById(req.params.id).populate('author', 'name university')
  if (!material || material.status !== 'published') {
    return res.status(404).json({ error: 'material not found' })
  }

  res.json({
    material: {
      id: material._id,
      type: material.type,
      title: material.title,
      content: material.content,
      externalUrl: material.externalUrl,
      language: material.language,
      publishedAt: material.publishedAt,
      authorName: material.author?.name || 'Unknown',
      authorUniversity: material.author?.university || '',
    },
  })
}
