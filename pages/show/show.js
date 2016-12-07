// pages/show/show.js
Page({
   data:{
   	 content:""
   },
    onLoad:function(e){
      this.setData({
          title: e.title,
          id: e.id
      })  
    },
    action:function(e){
        var id= e.currentTarget.dataset.id;
        var name= e.currentTarget.dataset.name;
        console.log(id,name);
         wx.navigateTo({
            url:'/pages/pinlun/pinlun?id='+id+'&title='+name
        })
    },
    onReady:function(){
        var self=this;
        wx.setNavigationBarTitle({
            title:this.data.title
        });
        wx.showToast({
            title:'加载中',
            icon:'loading',
            duration:5000
        });

        wx.request({
            url:'http://news-at.zhihu.com/api/4/news/'+this.data.id,
            success:function(r){
                wx.hideToast();
                var c= r.data.body.replace(/<[^>]+>|<(\/?)([a-zA-Z]+)([^<]*)>|/g,'');
                self.setData({
                    content:c
                })
            }
        })
    }
})