import{request} from "../../request/health.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        name:"儿童",
        isActive:true
      },
      {
        id:1,
        name:"中年",
        isActive:false
      },
      {
        id:2,
        name:"老年",
        isActive:false
      },
    ],
    sijiList:[],
    index:0,
    page:{
      pageIndex:1,
      totalSize:""
    }
  },
  get_items(index){
    request({
      url: '/getheathbytype',
      data:{
        main_type:2,
        sub_type:index,
        pageIndex:this.data.page.pageIndex
      },
    })
    .then(result=>{
      this.setData({
        sijiList:[...this.data.sijiList,...result.data.data],
        /*页码相关*/
        page:result.data.page,
      });
    });
  },

  handleItemChange(e){
    //console.log(e.detail.index);
    const index=e.detail.index;
    this.setData({
      page:{
        pageIndex:1,
        totalSize:""
      },
      sijiList:[],
      index:index,
    });
    this.get_items(index);
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.page.pageIndex>=this.data.page.totalSize){
      //没有下一页数据
      console.log("没有下一页");
    }else{
      //console.log("有下一页");
      this.data.page.pageIndex++;
      this.get_items(this.data.index);
    }
  }
})