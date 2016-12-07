var ntils=require("../../ntils/new.js");
var $=require("../../ntils/animation.js");
console.log($.getAni("slideout"));
var date=new Date();
var flag=true;
Page({
	 data: {
		tops:[],
		news:[],
	    indicatorDots: true,
	    autoplay: true,
	    interval: 5000,
	    duration: 1000,
	    active:false,
	    ani:{
	    	
	    },
		pic:"",
		fade:{}
	  },
	  tapbutton:function(){
	  	if(!this.data.active){
	  		this.setData({
	  			ani:$.getAni("slideout"),
	  			active:true
	  		})
	  	}else{
	  		this.setData({
	  			ani:$.getAni("slidein"),
	  			active:false
	  		})
	  	}
	  },
	  setfade:function(){
	  	var fadeOut=wx.createAnimation({
	  		duration: 1000,
            timingFunction: "ease-out"
	  	})
	  	fadeOut.opacity(0);
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
    action2:function(e){
        var id= e.currentTarget.dataset.id;
        var name= e.currentTarget.dataset.name;
        console.log(id,name);
         wx.navigateTo({
            url:'/pages/lists/lists?id='+id+'&title='+name
        })
    },
	onLoad:function(options){
		    // 页面初始化 options为页面跳转所带来的参数
	 },
	 onReachBottom:function(){
	 	var s=ntils.formatDate(date);
		var url="http://news.at.zhihu.com/api/4/news/before/"+s;
		var self=this;
		if(flag){
			flag=false;
			wx.request({
				url:url,
				success:function(r){
					flag=true;
					date=ntils.before(date);
					var n=self.data.news.concat(ntils.formatArr(r.data.stories));
					self.setData({
						news:n
					})
				},
				compelet:function(){
					 flag=true;
					 wx.hideToast();
				}
			})
		}
	 },
     onReady:function(){
    // 页面渲染完成
	    var self=this;
	    wx.request({
	    	url:"http://news-at.zhihu.com/api/4/themes",
	    	success:function(r){
	    		self.setData({
	    			themes:r.data.others
	    		})
	    	}
	    }),
	    wx.request({
	      url:"http://news-at.zhihu.com/api/4/news/latest",
	      success:function(r){
	        var t=r.data.top_stories;
	        var n=r.data.stories;
	        self.setData({
	          tops:ntils.formatArr(t),
	          news:ntils.formatArr(n)
	        })
	      }
	    }),
	    wx.request({
	    	url:"http://news-at.zhihu.com/api/4/start-image/1080*1776",
	    	success:function(r){
				 var fadeout=wx.createAnimation({
                    duration:1000,
                    timingFunction:"ease-out",
                    delay:2000
                });
				fadeout.opacity(0).scale(0,0).step();
                
				var pic=r.data.img;
		        self.setData({
		        	pic:ntils.format(pic)
		        });
				setTimeout(function(){
                    self.setData({
                        fade:fadeout.export()
                    });
                },100)
	        }
	    }),
	    wx.showToast({
		  title: '加载中',
		  icon: 'loading'
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