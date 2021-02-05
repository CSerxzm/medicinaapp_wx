import{request} from "../../request/myrequest.js";
Page({
  data: {
    selectArray: ['白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座','水瓶座','双鱼座'],
    user:"",
    image:"",
    sex:1,
    phone:"",
    email:"",
    constellation:"",
    /*校验规则*/
    emailRules: [
      {type: 'email',message:"无效的邮件格式"},
      {required: true,message:"邮件为必填项"}
    ],
    phoneRules: [
      { min: 8, max: 20, message: '电话长度在8-20个字符之间', trigger: 'blur' },
      { pattern: '^[0-9]+$', message: '电话由数字组成',trigger: 'blur'},
      {required: true,message:"手机为必填项"}
    ]
  },
  
  handleSexChange(e) {
    this.setData({
        sex:e.detail.value
    });
  },

  emailInput :function (e) { 
    this.setData({ 
    email:e.detail.value 
    });
  }, 
  phoneInput :function (e) {
    this.setData({ 
    phone:e.detail.value 
    });
  }, 
  constellationInput :function (e) { 
    this.setData({ 
      constellation:e.detail.value 
    });
  }, 

  onLoad: function (options) {
    wx.lin.initValidateForm(this);
    const user = wx.getStorageSync('LoginUser');
    this.setData({
      user
    });
    this.setData({
      image:user.image,
      sex:user.sex,
      phone:user.phone,
      email:user.email,
      constellation:user.constellation
    });
  },

  imageClick:function(){
    var that = this;
    wx.chooseImage({  //从本地相册选择图片或使用相机拍照
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'], 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        var uid = that.data.uid
        wx.uploadFile({
          url: 'https://fuyuanplant.cn/medicineapp/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            const image = res.data;
            that.setData({
              image
            });
          }
        })
      }
    })
  },
  updateuser:function(){
    var that = this;
    request({
      url: '/updateuserwithoutpassandauthority',
      data: {
        name:that.data.user.name,
        image:that.data.image,
        sex:that.data.sex,
        phone:that.data.phone,
        email:that.data.email,
        constellation:that.data.constellation
      }
    })
    .then(result=>{
      if(result.data){
        console.log(result.data);
        wx.showToast({ 
          title: '更新成功', 
          icon: 'success', 
          duration: 1000 
        });
        wx.setStorageSync('LoginUser', result.data)
        wx.switchTab({
          url: "/pages/personal_index/personal_index"
        });
      }else{
        wx.showToast({ 
          title: '更新失败', 
          icon: 'loading', 
          duration: 1000 
        }) 
      }
    })
  },
  select: function(e) {
    this.setData({
      constellation:e.detail
    });
  }
})