/**
 * Created by Ch on 17/4/6.
 */
import "../sass/admin.scss"
new Vue({
    el : "#app",
    data (){
        return {
            statusList : [
                {
                    name : '未审核',
                    val : '1'
                },
                {
                    name : '审核通过',
                    val : '3'
                },
                {
                    name : '审核失败',
                    val : '2'
                }

            ],
            typeList : [
                {
                    name : '驾驶证',
                    val : 'user'
                },
                {
                    name : '行驶证通过',
                    val : 'car'
                }

            ],
            status : '1',
            type : 'user',
            listData : [],
            myCar : '',
            myUser : '',
            remark: ''
        }
    },
    ready(){
      this.queryData();
    },
    methods : {
        queryData(){
            eluUtil.jsonp({
                url : eluConfig.serverPath + 'admin/queryUserCarLicence',
                data : {
                    status : this.status,
                    type : this.type
                }
            },res =>{
                this.listData = res.list
            })
        },
        save(i,type,status){
            let url = type == 'myUser' ? 'user/updateUserLicence' : 'user/updateCar';
            if(status){
                eluUtil.jsonp({
                    url : eluConfig.serverPath + url,
                    data : {
                        id : i.id,
                        status : status,
                        remark : this.remark
                    }
                },res =>{
                    console.log(res);
                });
            }
            this[type] = '';
            this.remark = '';
        }
    }
});