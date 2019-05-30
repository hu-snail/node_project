
module.exports = {
     /**
     * 查询数据
     * @param node_model 数据表
     * @param conditions 查询条件
     * @param fields 待返回字段
     * @param callback 回调方法
     */
    find: (node_model, conditions, fields, callback) => {
        node_model.find(conditions, fields || null, {}, (err, res) => {
            if (err) {
                callback(err)
            } else {
                callback(null, res)
            }
        })
    },

    /**
     * 保存数据
     * @param node_model 表名
     * @param fields 表数据
     * @param callback 回调方法
     */
    save: (node_model, fields, callback) => {
        if (!fields) {
            if (callback) callback({msg: '字段不允许为空'})
            return false
        }
    
        let err_num = 0
        for (let i in fields) {
            // if (![node_model][i]) err_num ++
            // console.log('错误')
        }
        if (err_num > 0) {
            if (callback) callback({msg: '参数字段名错误'})
            return false
        }
    
        let mongooseEntity = new node_model(fields)
        mongooseEntity.save((err, res) => {
            if (err) {
                if (callback) callback(err)
            } else {
                if (callback) callback(null, res)
            }
        })
    }
}

