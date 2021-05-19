var requestUrl = null;

var imgs = "";
apiready = function() {
    var type = api.pageParam.type;
    var user = getUserCache();
    requestUrl = type == 1 ? 'auth/bank/card' : 'bank/card/update/';

    if (type == 2) {
        getBankcard();
    }

    if (user) {
        $('input[name=realName]').val(user.realName);
        $('input[name=cardNo]').val(user.cardNo);
        $('input[name=phone]').val(user.phone);
    }

    tap($('.sms-btn'), function (){
        sendSms($(this));
    });

    tap($('.submit-btn button'), function () {
        var data = checkForm();
        if (imgs === "") {
            toast("请上传银行卡图片");
            return;
        }
        if (!data) {
            return;
        }
        data.cardFile = imgs;

        showLoading();
        post(requestUrl, data, function (res) {
            if (res.status === 'error') {
                toast(res.msg);
            } else if (res.status === 'success') {
                toast(res.msg, function (){
                    api.closeWin();
                });
            }
        });
    });
    tap($("#upImgBtn"),function(){
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
                // var FNPhotograph = api.require('FNPhotograph');
                // FNPhotograph.open({
                //     path: 'fs://savePath',
                //     album: true,
                //     qualityValue: '50'
                // }, function (ret) {
                //     console.log(JSON.stringify(ret))
                //     if (ret.eventType === 'takePhoto') {
                //         var imagePath = ret.imagePath;
                //         //clip img
                //         upLoadImg(imagePath);
                //         FNPhotograph.close();
                //     }
                // });
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
                            imgs = imgPath;
                            upLoadImg(imgPath);
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
                            imgs = imgPath;
                            upLoadImg(imgPath);
                        }
                    }
                });
            }
        });
    });
}

function upLoadImg(imgSrcPath){
    $(".icon").css("display","none");
    $("#imgSrcPath").css("display","block");
    $("#imgSrcPath").attr("src",imgSrcPath);
}
function getBankcard() {
    get('bank/card/info', {}, function (res){
        if (res.status == 'success') {
            requestUrl += res.data.id;
            $('input[name=number]').val(res.data.number);
        }
    })
}
