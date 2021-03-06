const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 定义 schema
const schema = new Schema({title: String, url: String, tagid: String, tagname: String})
const Bookmark = mongoose.model('bookmark', schema)

// urldog 为数据库名
const uri = 'mongodb://localhost:27017/urldog'

module.exports.getBookmarks = obj => {
  return new Promise(resolve => {
    mongoose
      .connect(uri)
      .then(db => {
        console.log('😄 连接数据库成功')

        let searchObj = obj.id ? {tagid: obj.id} : {}
        Bookmark.find(searchObj, (err, docs) => {
          // 这里应该增加 err 判断
          resolve(docs)
        })

        // 关闭数据库
        // db.close()
      })
      .catch(error => {
        console.log('😿 连接数据库失败')
        console.log(error)
      })
  })
}

module.exports.insertBookmark = obj => {
  return new Promise(resolve => {
    mongoose
      .connect(uri)
      .then(db => {
        console.log('😄 连接数据库成功')

        let doc = new Bookmark(obj)
        doc.save((err, result) => {
          if (err) {
            console.log(err)
            return
          }

          console.log('保存成功')
          resolve(result)
        })

        // 关闭数据库
        // db.close()
      })
      .catch(error => {
        console.log('😿 连接数据库失败') 
        console.log(error)
      })
  })
}

module.exports.delBookmark = obj => {
  return new Promise(resolve => {
    mongoose
      .connect(uri)
      .then(db => {
        console.log('😄 连接数据库成功')
        
        // 删
        Bookmark.remove({_id: obj.id}, err => {
          if (err) {
            console.log(err)
          } else {
            console.log('remove ok')
            resolve({})
          }
        })

        // 关闭数据库
        // db.close()
      })
      .catch(error => {
        console.log('😿 连接数据库失败') 
        console.log(error)
      })
  })
}

module.exports.updateBookmark = obj => {
  return new Promise(resolve => {
    mongoose
      .connect(uri)
      .then(db => {
        console.log('😄 连接数据库成功')
        
        // 条件
        var myWhere = {_id: obj._id}

        // 设置新值
        // 更新的数据比较少用 $set，可用性还是很好
        let {title, url, tagid, tagname} = obj
        var newValue = {$set: {title, url, tagid, tagname}}

        Bookmark.update(myWhere, newValue, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log('update ok')
            // 这里的 result 好像不是真实的数据？
            resolve(result)
          }
        })

        // 关闭数据库
        // db.close()
      })
      .catch(error => {
        console.log('😿 连接数据库失败') 
        console.log(error)
      })
  })
}