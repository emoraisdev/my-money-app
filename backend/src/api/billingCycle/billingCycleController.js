import BillingCycle from './billingCycle.js'

export async function getAll(req, res) {
  const data = await BillingCycle.find()
  res.json(data)
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