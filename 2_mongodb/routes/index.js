var express = require('express')
var router = express.Router()
const moment = require('moment')
const accountModel = require('../models/accountModel')

// 记账列表
router.get('/account', function (req, res, next) {
  accountModel
    .find()
    .sort({ time: -1 })
    .then(res1 => {
      res.render('list', { lists: res1, moment })
    })
    .catch(err => {
      console.log('获取失败', err)
      res.status(500).send('获取失败')
    })
})
// 新增记账
router.get('/account/create', function (req, res, next) {
  res.render('create')
})

router.post('/account', (req, res) => {
  console.log(req.body)
  accountModel
    .create({
      ...req.body,
      time: moment(req.body.time).toDate()
    })
    .then(() => {
      res.render('success', { msg: '添加成功', url: '/account', flag: '1' })
    })
    .catch(err => {
      console.log('添加失败', err)
      res.status(500).send('添加失败')
    })
})

// 删除
router.get('/account/:id', (req, res) => {
  accountModel
    .deleteOne({ _id: req.params.id })
    .then(() => {
      res.render('success', { msg: '删除成功', url: '/account', flag: '0' })
    })
    .catch(err => {
      console.log('删除失败', err)
      res.status(500).send('添加失败')
    })
})

module.exports = router
