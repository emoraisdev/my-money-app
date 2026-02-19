import BillingCycle from './billingCycle.js'

export async function getAll(req, res) {

  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    const skip = (page - 1) * limit

    const total = await BillingCycle.countDocuments()
    const data = await BillingCycle
      .find()
      .skip(skip)
      .limit(limit)

    res.json({
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    })

  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar registros' })
  }
}

export async function getSummary(req, res) {

  try {

    const result = await BillingCycle.aggregate([
      {
        $project: {
          credit: { $sum: "$credits.value" },
          debt: { $sum: "$debts.value" }
        }
      },
      {
        $group: {
          _id: null,
          credit: { $sum: "$credit" },
          debt: { $sum: "$debt" }
        }
      },
      {
        $project: {
          _id: 0,
          credit: 1,
          debt: 1
        }
      }
    ])

    res.json(result[0] || { credit: 0, debt: 0 })

  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar Summary' })
  }
}

export async function create(req, res) {
  const item = await BillingCycle.create(req.body)
  res.status(201).json(item)
}

export async function update(req, res) {
  const item = await BillingCycle.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  )

  res.json(item)
}

export async function remove(req, res) {
  await BillingCycle.findByIdAndDelete(req.params.id)
  res.sendStatus(204)
}