var ntils=require("../../ntils/new.js");
var $=require("../../ntils/animation.js");
console.log($.getAni("slideout"));
var date=new Date();
var flag=true;
Page({
	 data: {
		tops:[],
		news:[],
	    autoplay: true,
	    interval: 5000,
	    duration: 1000,
	    active:false,
	    ani:{
	    	
	    },
		fade:{}
	  },
	  onLoad:function(e){
	      this.setData({
	          name: e.title,
	          id: e.id
	      })  
	     
	   },
	  action:function(e){
	    this.setData({
			active:false
		});
        var id= e.currentTarget.dataset.id;
        var title= e.currentTarget.dataset.title;
        wx.showActionSheet({
            itemList:['分享','阅读'],
            success:function(e){
                if(e.tapIndex===0){
                    wx.showModal({
                        title:'分享',
                        content:'..',
                        success:function(res){
                             if(res.confirm){
                             }
                        }
                    })
                }else if(e.tapIndex===1){
                    wx.navigateTo({
                        url:'/pages/show/show?id='+id+'&title='+title

                    })
                }
            }
        })
    },
	 onReachBottom:function(){
	 },
     onReady:function(){
    // 页面渲染完成
	    var self=this;
	    wx.request({
	      url:"http://news-at.zhihu.com/api/4/theme/"+this.data.id,
	      success:function(r){
			  console.log(r)
	        var t=r.data.stories;
	        var n=r.data.stories;
	        self.setData({
	          tops:ntils.formatArr(t),
	          news:ntils.formatArr(n)
	        })
	      }
	    }),
	    wx.setNavigationBarTitle({
            title:this.data.name
        }),
	    wx.showToast({
		  title: '加载中',
		  icon: 'loading',
		})
	    
	  },
	  onShow:function(){
	    // 页面显示
	  },
	  onHide:function(){
	    // 页面隐藏
	  },
	  onUnload:function(){
	    // 页面关闭
	  }
})