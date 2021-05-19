var imgs = {//選擇的圖片路徑
    cardFront:"",
    cardBack:"",
    portrait:"",
};
apiready = function() {
    var user = getUserCache();
    tap($('.submit-btn button'), function () {
        // for(let key in imgs){
        //     if(!imgs[key]){
        //         toast("图片信息上传不完整");
        //         return;
        //     }
        // }
        cardNoData = checkForm();
        var data =  {
            "cardFront":imgs["cardFront"],
            "cardBack":imgs["cardBack"],
            "portrait":imgs["portrait"],
            "cardNo":cardNoData.cardNo,
            "name":cardNoData.name
        };

        // cardNoData = checkForm();
        // var data =  {
        //     "cardFront":"cardFront",
        //     "cardBack":"cardBack",
        //     "portrait":"portrait",
        //     "cardNo":cardNoData.cardNo,
        //     "name":cardNoData.name
        // };
        showLoading();
        post('auth/identity', data, function (res){
            if (res.status === 'error') {
                toast(res.msg);
            } else if (res.status === 'success') {
                toast(res.msg, function (){
                    api.closeWin();
                });
            }else{
                toast(ListToJsonString(res));
            }
        });
    });
    tap($("#upImgBtn1"),function(){
        api.actionSheet({
            cancelTitle: '取消',
            buttons: ['拍照', '从相册中选取'],
            style: {
                layerColor: 'rgba(0,0,0,.7)',
                itemNormalColor: '#fff'
            }
        }, function (ret, err) {
            var index = ret.buttonIndex;
            if (index === 1) { //拍照
                api.getPicture({
                    sourceType: 'camera',
                    encodingType: 'jpg',
                    allowEdit: false,
                    destinationType:'base64',
                }, function (ret, err) {
                    if (ret) {
                        if (ret.base64Data === '') {
                            return;
                        } else {
                            var imgPath = ret.base64Data;
                            imgs.cardFront = imgPath;
                            upLoadImg('.icon1','#imgSrcPath1',imgPath);
                        }
                    }
                });

            } else if (index === 2) { //从相册中选
                api.getPicture({
                    sourceType: 'library',
                    encodingType: 'jpg',
                    allowEdit: false,
                    destinationType:'base64',
                }, function (ret, err) {
                    if (ret) {
                        if (ret.base64Data === '') {
                            return;
                        } else {
                            var imgPath = ret.base64Data;
                            imgs.cardFront = imgPath;
                            upLoadImg('.icon1','#imgSrcPath1',imgPath);
                            // upLoadImg(imgPath);
                        }
                    }
                });
            }
        });
    });
    tap($("#upImgBtn2"),function(){
        api.actionSheet({
            cancelTitle: '取消',
            buttons: ['拍照', '从相册中选取'],
            style: {
                layerColor: 'rgba(0,0,0,.7)',
                itemNormalColor: '#fff'
            }
        }, function (ret, err) {
            var index = ret.buttonIndex;
            if (index === 1) { //拍照
                api.getPicture({
                    sourceType: 'camera',
                    encodingType: 'jpg',
                    allowEdit: false,
                    destinationType:'base64',
                }, function (ret, err) {
                    if (ret) {
                        if (ret.base64Data === '') {
                            return;
                        } else {
                            var imgPath = ret.base64Data;
                            imgs.cardBack = imgPath;
                            upLoadImg('.icon2','#imgSrcPath2',imgPath);
                        }
                    }
                });

            } else if (index === 2) { //从相册中选
                api.getPicture({
                    sourceType: 'library',
                    encodingType: 'jpg',
                    allowEdit: false,
                    destinationType:'base64',
                }, function (ret, err) {
                    if (ret) {
                        if (ret.base64Data === '') {
                            return;
                        } else {
                            var imgPath = ret.base64Data;
                            imgs.cardBack = imgPath;
                            upLoadImg('.icon2','#imgSrcPath2',imgPath);
                        }
                    }
                });
            }
        });
    });
    tap($("#upImgBtn3"),function(){
        api.actionSheet({
            cancelTitle: '取消',
            buttons: ['拍照', '从相册中选取'],
            style: {
                layerColor: 'rgba(0,0,0,.7)',
                itemNormalColor: '#fff'
            }
        }, function (ret, err) {
            var index = ret.buttonIndex;
            if (index === 1) { //拍照
                api.getPicture({
                    sourceType: 'camera',
                    encodingType: 'jpg',
                    allowEdit: false,
                    destinationType:'base64',
                }, function (ret, err) {
                    if (ret) {
                        if (ret.base64Data === '') {
                            return;
                        } else {
                            var imgPath = ret.base64Data;
                            imgs.portrait = imgPath;
                            upLoadImg('.icon3','#imgSrcPath3',imgPath);
                        }
                    }
                });

            } else if (index === 2) { //从相册中选
                api.getPicture({
                    sourceType: 'library',
                    encodingType: 'jpg',
                    allowEdit: false,
                    destinationType:'base64',
                }, function (ret, err) {
                    if (ret) {
                        if (ret.base64Data === '') {
                            return;
                        } else {
                            var imgPath = ret.base64Data;
                            imgs.portrait = imgPath;
                            upLoadImg('.icon3','#imgSrcPath3',imgPath);
                        }
                    }
                });
            }
        });
    });
}

function upLoadImg(iconDom,imgDom,imgSrcPath){
    $(iconDom).css("display","none");
    $(imgDom).css("display","block").attr("src",imgSrcPath);
}
