function rand(){return Random.I.v()}function randF(t,e){return Random.I.f(t,e)}function randI(t,e){return Random.I.i(t,e)}function randBool(){return Random.I.bool()}var __reflect=this&&this.__reflect||function(t,e,i){t.__class__=e,i?i.push(e):i=[e],t.__types__=t.__types__?i.concat(t.__types__):i},__extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s]);i.prototype=e.prototype,t.prototype=new i},GameObject=function(){function t(){this.display=null,t.objects.push(this)}return t.prototype.destroy=function(){this.deleteFlag=!0},t.prototype.onDestroy=function(){},t.initial=function(e){t.display=e},t.process=function(){t.objects.forEach(function(t){return t.update()}),t.objects=t.objects.filter(function(t){return t.deleteFlag&&t["delete"](),!t.deleteFlag}),t.transit&&(t.dispose(),t.transit(),t.transit=null)},t.dispose=function(){t.objects=t.objects.filter(function(t){return t.destroy(),t["delete"](),!1})},t.prototype["delete"]=function(){this.onDestroy(),this.display&&(t.display.removeChild(this.display),this.display=null)},t.objects=[],t}();__reflect(GameObject.prototype,"GameObject");var PhysicsObject=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.prototype.onDestroy=function(){this.body&&(e.world.removeBody(this.body),this.body.displays=[],this.body=null)},e.prototype.update=function(){if(this.display){var t=this.body,e=this.display;e.x=this.px,e.y=this.py,e.rotation=180*t.angle/Math.PI}this.fixedUpdate()},e.prepare=function(t){e.pixelPerMeter=t,e.meterPerPixel=1/t,e.width=e.pixelToMeter(Util.width),e.height=e.pixelToMeter(Util.height),e.world=new p2.World,e.world.gravity=[0,.08*e.height],e.world.defaultContactMaterial.friction*=2,e.lastTime=Date.now(),e.deltaScale=1},e.progress=function(){var t=Date.now(),i=(t-this.lastTime)*this.deltaScale;this.lastTime=t,i>0&&e.world.step(1/60*this.deltaScale,i,4)},e.pixelToMeter=function(t){return t*e.meterPerPixel},e.meterToPixel=function(t){return t*e.pixelPerMeter},e.prototype.m2p=function(t){return e.meterToPixel(t)},e.prototype.p2m=function(t){return e.pixelToMeter(t)},Object.defineProperty(e.prototype,"px",{get:function(){return e.meterToPixel(this.mx)},set:function(t){this.mx=e.pixelToMeter(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"py",{get:function(){return e.meterToPixel(this.my)},set:function(t){this.my=e.pixelToMeter(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"mx",{get:function(){return this.body.position[0]},set:function(t){this.body.position[0]=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"my",{get:function(){return this.body.position[1]},set:function(t){this.body.position[1]=t},enumerable:!0,configurable:!0}),e.deltaScale=1,e}(GameObject);__reflect(PhysicsObject.prototype,"PhysicsObject");var Camera2D=function(){function t(){}return t.initial=function(){t.x=0,t.y=0,t.scale=1},t.transform=function(e){e.x=(e.x-t.x)*t.scale,e.y=(e.y-t.y)*t.scale,e.scaleX=e.scaleY=t.scale},t.x=0,t.y=0,t.scale=1,t}();__reflect(Camera2D.prototype,"Camera2D");var EffectLine=function(t){function e(e,i,s,o,n){void 0===n&&(n=16760832);var r=t.call(this)||this;return r.frame=0,r.x=e,r.y=i,r.vx=s,r.vy=o,r.color=n,r.setShape(0),r}return __extends(e,t),e.prototype.setShape=function(t){var e=new egret.Shape;this.display&&GameObject.display.removeChild(this.display),this.display=e,GameObject.display.addChild(this.display),t=t*Math.PI*.5;var i=Math.sin(t),s=1-Math.cos(t);e.graphics.lineStyle(10,this.color),e.graphics.moveTo(this.x+this.vx*i,this.y+this.vy*i),e.graphics.lineTo(this.x+this.vx*s,this.y+this.vy*s)},e.prototype.update=function(){if(++this.frame>=e.maxFrame)return void this.destroy();var t=this.frame/e.maxFrame;this.setShape(t)},e.maxFrame=30,e}(GameObject);__reflect(EffectLine.prototype,"EffectLine");var PIXEL_PER_METER=1,BLOCK_SIZE_PER_H=.1,SAVE_KEY_BESTSCORE="tower-bestScore",BACK_COLOR=15394780,FONT_COLOR=15227471,BLOCK_COLOR=14205861,BLOCK_COLOR2=15302772,BLOCK_COLOR3=9342346,Game=function(){function t(){}return t.loadSceneGamePlay=function(){PhysicsObject.deltaScale=1,new Score,new Ground,new Player,new StartMessage},t}();__reflect(Game.prototype,"Game");var Ground=function(t){function e(){var e=t.call(this)||this,i=.5*Util.width,s=.95*Util.height;return e.sizeW=.5*Util.height,e.sizeH=.1*Util.height,e.setDisplay(i,s),e.setBody(i,s),Camera2D.transform(e.display),e}return __extends(e,t),e.prototype.setDisplay=function(t,e){this.display&&GameObject.display.removeChild(this.display);var i=new egret.Shape;this.display=i,GameObject.display.addChild(this.display),i.x=t,i.y=e,i.graphics.beginFill(BLOCK_COLOR3),i.graphics.drawRect(-.5*this.sizeW,-.5*this.sizeH,this.sizeW,this.sizeH),i.graphics.endFill()},e.prototype.setBody=function(t,e){this.body=new p2.Body({position:[this.p2m(t),this.p2m(e)],type:p2.Body.STATIC});var i=new p2.Box({width:this.sizeW,height:this.sizeH});this.body.addShape(i),this.body.displays=[this.display],PhysicsObject.world.addBody(this.body)},e.prototype.onDestroy=function(){PhysicsObject.world.removeBody(this.body),this.body.displays=[],this.body=null},e.prototype.fixedUpdate=function(){Camera2D.transform(this.display)},e}(PhysicsObject);__reflect(Ground.prototype,"Ground");var Player=function(t){function e(){var i=t.call(this)||this;return i.state=i.stateNone,i.step=0,i.block=null,i.blockAngle=0,i.rotateButton=null,i.swipeButton=null,i.onSwipeRelease=function(){i.setStateRelease()},i.onTapRotate=function(){i.blockAngle+=Math.PI/2},e.I=i,i.x=.5*Util.width,i.y=.2*Util.height,i.block=new Block(i.x,i.y,randI(0,3)),i}return __extends(e,t),e.prototype.onDestroy=function(){e.I=null},e.prototype.update=function(){this.state();var t=Util.clamp(Util.height/(Util.height-(this.y-BLOCK_SIZE_PER_H*Util.height*2)),0,1);Camera2D.scale+=.1*(t-Camera2D.scale),Camera2D.x=(1-1/Camera2D.scale)*Util.width*.5,Camera2D.y=(1-1/Camera2D.scale)*Util.height},e.prototype.setStateNone=function(){this.state=this.stateNone,this.step=0,this.block&&(this.block.destroy(),this.block=null),this.swipeButton&&(this.swipeButton.destroy(),this.swipeButton=null),this.rotateButton&&(this.rotateButton.destroy(),this.rotateButton=null)},e.prototype.stateNone=function(){},e.prototype.setStateHold=function(){this.state=this.stateHold,this.y-=BLOCK_SIZE_PER_H*Util.height*.5,this.block||(this.block=new Block(this.x,this.y,randI(0,3))),this.blockAngle=this.block.body.angle,this.swipeButton=new Button(null,0,0,.5,.3,1,.6,0,0,this.onSwipeRelease),this.rotateButton=new Button("↻",Util.height/16,BACK_COLOR,.9,.05,.2,.1,FONT_COLOR,1,this.onTapRotate)},e.prototype.stateHold=function(){this.block.body.angle+=.2*(this.blockAngle-this.block.body.angle),this.swipeButton.touch&&(this.block.px=Util.clamp(this.swipeButton.x,0,Util.width))},e.prototype.setStateRelease=function(){this.state=this.stateRelease,this.step=0,this.block.drop(),this.block=null,this.swipeButton.destroy(),this.swipeButton=null,this.rotateButton.destroy(),this.rotateButton=null,Score.I.addPoint(1)},e.prototype.stateRelease=function(){this.step++,this.step>=120&&this.setStateHold()},e.I=null,e}(GameObject);__reflect(Player.prototype,"Player");var Button=function(t){function e(e,i,s,o,n,r,a,h,l,c){var p=t.call(this)||this;p.text=null,p.onTap=null,p.touch=!1,p.x=0,p.y=0;var d=new egret.Shape;GameObject.display.addChild(d),d.graphics.beginFill(h,l);var y=r*Util.width,u=a*Util.height;return d.graphics.drawRoundRect(-.5*y,-.5*u,y,u,.2*y),d.graphics.endFill(),d.touchEnabled=!0,d.x=o*Util.width,d.y=n*Util.height,p.display=d,e&&(p.text=Util.newTextField(e,i,s,o,n,!0,!1),GameObject.display.addChild(p.text)),p.onTap=c,p.onTap&&p.display.addEventListener(egret.TouchEvent.TOUCH_TAP,p.onTap,p),p.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN,p.touchBegin,p),p.display.addEventListener(egret.TouchEvent.TOUCH_MOVE,p.touchMove,p),p.display.addEventListener(egret.TouchEvent.TOUCH_END,p.touchEnd,p),p}return __extends(e,t),e.prototype.onDestroy=function(){this.onTap&&this.display.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this),GameObject.display.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this),GameObject.display.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this),GameObject.display.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this),this.text&&GameObject.display.removeChild(this.text)},e.prototype.update=function(){var t=this.touch?1.1:1;this.display.scaleX=this.display.scaleY=this.display.scaleX+.25*(t-this.display.scaleX)},e.prototype.touchBegin=function(t){this.x=t.stageX,this.y=t.stageY,this.touch=!0},e.prototype.touchMove=function(t){this.x=t.stageX,this.y=t.stageY,this.touch=!0},e.prototype.touchEnd=function(t){this.touch=!1},e}(GameObject);__reflect(Button.prototype,"Button");var Block=function(t){function e(i,s,o){var n=t.call(this)||this;switch(e.blocks.push(n),n.sizeW=BLOCK_SIZE_PER_H*Util.height,n.sizeH=n.sizeW,randI(0,3)){case 0:n.color=BLOCK_COLOR;break;case 1:n.color=BLOCK_COLOR2;break;case 2:n.color=BLOCK_COLOR3}return n.setDisplay(i,s,o),n.setBody(i,s,o),n.body.angle=randI(0,3)*Math.PI/2,n.display.rotation=180*n.body.angle/Math.PI,Camera2D.transform(n.display),n}return __extends(e,t),e.prototype.onDestroy=function(){var i=this;t.prototype.onDestroy.call(this),e.blocks=e.blocks.filter(function(t){return t!=i})},e.prototype.setDisplay=function(t,e,i){this.display&&GameObject.display.removeChild(this.display);var s=new egret.Shape;switch(this.display=s,GameObject.display.addChildAt(this.display,1),s.x=t,s.y=e,s.graphics.beginFill(this.color),i){case 0:s.graphics.drawRect(-.5*this.sizeW,-.5*this.sizeH,this.sizeW,this.sizeH);break;case 1:s.graphics.drawRect(-1*this.sizeW,-.5*this.sizeH,this.sizeW,this.sizeH),s.graphics.drawRect(0*this.sizeW,-.5*this.sizeH,this.sizeW,this.sizeH);break;case 2:s.graphics.drawRect(-1*this.sizeW,-1*this.sizeH,this.sizeW,this.sizeH),s.graphics.drawRect(0*this.sizeW,-1*this.sizeH,this.sizeW,this.sizeH),s.graphics.drawRect(0*this.sizeW,0*this.sizeH,this.sizeW,this.sizeH)}s.graphics.endFill()},e.prototype.setBody=function(t,e,i){switch(i){case 0:this.body=new p2.Body({gravityScale:0,mass:1,position:[this.p2m(t),this.p2m(e)]}),this.body.addShape(new p2.Box({width:this.sizeW,height:this.sizeH}),[0,0],0);break;case 1:this.body=new p2.Body({gravityScale:0,mass:2,position:[this.p2m(t),this.p2m(e)]}),this.body.addShape(new p2.Box({width:this.sizeW,height:this.sizeH}),[-.5*this.sizeW,0],0),this.body.addShape(new p2.Box({width:this.sizeW,height:this.sizeH}),[.5*this.sizeW,0],0);break;case 2:this.body=new p2.Body({gravityScale:0,mass:3,position:[this.p2m(t),this.p2m(e)]}),this.body.addShape(new p2.Box({width:this.sizeW,height:this.sizeH}),[-.5*this.sizeW,-.5*this.sizeH],0),this.body.addShape(new p2.Box({width:this.sizeW,height:this.sizeH}),[.5*this.sizeW,-.5*this.sizeH],0),this.body.addShape(new p2.Box({width:this.sizeW,height:this.sizeH}),[.5*this.sizeW,.5*this.sizeH],0)}this.body.displays=[this.display],PhysicsObject.world.addBody(this.body)},e.prototype.fixedUpdate=function(){if(Camera2D.transform(this.display),this.py>=Util.height){Player.I.state!=Player.I.stateNone&&(new GameOver,Player.I.setStateNone(),PhysicsObject.deltaScale=.1);for(var t=this.sizeH*Camera2D.scale,e=0;4>e;e++){var i=rand()*Math.PI,s=Math.cos(i),o=-Math.sin(i),n=t*(2+.5*e);new EffectLine(this.display.x+s*t,this.display.y+o*t,s*n,o*n,this.color)}return new EffectCircle(this.display.x,this.display.y,t,this.color),void this.destroy()}},e.prototype.drop=function(){this.body.setZeroForce(),this.body.gravityScale=1},e.blocks=[],e}(PhysicsObject);__reflect(Block.prototype,"Block");var Main=function(t){function e(){var e=t.call(this)||this;return e.once(egret.Event.ADDED_TO_STAGE,e.addToStage,e),e}return __extends(e,t),e.prototype.addToStage=function(){Util.init(this),GameObject.initial(this.stage),PhysicsObject.prepare(PIXEL_PER_METER),Camera2D.initial(),Game.loadSceneGamePlay(),egret.startTick(this.tickLoop,this)},e.prototype.tickLoop=function(t){return PhysicsObject.progress(),GameObject.process(),!1},e}(eui.UILayer);__reflect(Main.prototype,"Main");var EffectCircle=function(t){function e(i,s,o,n){void 0===n&&(n=16760832);var r=t.call(this)||this;return r.frame=e.maxFrame,r.radius=o,r.color=n,r.setShape(i,s,r.radius),r}return __extends(e,t),e.prototype.setShape=function(t,i,s){var o=new egret.Shape;this.display&&GameObject.display.removeChild(this.display),this.display=o,GameObject.display.addChild(this.display),o.x=t,o.y=i,o.graphics.lineStyle(3+10*(this.frame/e.maxFrame),this.color),o.graphics.drawCircle(0,0,s)},e.prototype.update=function(){return--this.frame<=0?void this.destroy():(this.radius*=1.03,void this.setShape(this.display.x,this.display.y,this.radius))},e.maxFrame=30,e}(GameObject);__reflect(EffectCircle.prototype,"EffectCircle");var Random=function(){function t(t){void 0===t&&(t=88675123),this.x=123456789,this.y=362436069,this.z=521288629,this.w=t}return t.prototype.v=function(){return(this.next()&t.max)/(t.max+1)},t.prototype.f=function(t,e){return t+this.v()*(e-t)},t.prototype.i=function(t,e){return Math.floor(this.f(t,e))},t.prototype.bool=function(){return 0!=(1&this.next())},t.prototype.next=function(){var t;return t=this.x^this.x<<11,this.x=this.y,this.y=this.z,this.z=this.w,this.w=this.w^this.w>>>19^(t^t>>>8)},t.max=268435455,t.I=new t(Math.floor(Math.random()*t.max)),t}();__reflect(Random.prototype,"Random");var Util=function(){function t(){}return t.init=function(t){this.height=t.stage.stageHeight,this.width=t.stage.stageWidth},t.clamp=function(t,e,i){return e>t&&(t=e),t>i&&(t=i),t},t.color=function(t,e,i){return 65536*Math.floor(255*t)+256*Math.floor(255*e)+Math.floor(255*i)},t.colorLerp=function(t,e,i){var s=1-i,o=((16711680&t)*s+(16711680&e)*i&16711680)+((65280&t)*s+(65280&e)*i&65280)+((255&t)*s+(255&e)*i&255);return o},t.newTextField=function(e,i,s,o,n,r,a){var h=new egret.TextField;return h.text=e,h.bold=r,h.size=i,h.textColor=s,a?(h.x=(t.width-h.width)*o,h.y=(t.height-h.height)*n):(h.x=t.width*o-.5*h.width,h.y=t.height*n-.5*h.height),h},t}();__reflect(Util.prototype,"Util");var GameOver=function(t){function e(){var e=t.call(this)||this;return e.textGameOver=null,e.textScore=null,e.retryButton=null,e.textGameOver=Util.newTextField("GAME OVER",Util.width/10,FONT_COLOR,.5,.4,!0,!1),GameObject.display.addChild(e.textGameOver),Score.I&&(Score.I.point>=Score.I.bestScore&&egret.localStorage.setItem(SAVE_KEY_BESTSCORE,Score.I.point.toFixed()),e.textScore=Util.newTextField("SCORE : "+Score.I.point.toFixed(),Util.width/14,FONT_COLOR,.5,.5,!0,!1),GameObject.display.addChild(e.textScore)),e.retryButton=new Button("リトライ",Util.width/16,BACK_COLOR,.5,.65,.4,.1,FONT_COLOR,1,e.onTapRetry),e}return __extends(e,t),e.prototype.onDestroy=function(){GameObject.display.removeChild(this.textGameOver),this.textGameOver=null,this.textScore&&(GameObject.display.removeChild(this.textScore),this.textScore=null)},e.prototype.update=function(){},e.prototype.onTapRetry=function(){GameObject.transit=Game.loadSceneGamePlay,this.destroy()},e}(GameObject);__reflect(GameOver.prototype,"GameOver");var Score=function(t){function e(){var i=t.call(this)||this;i.point=0,i.bestScore=0,i.text=null,i.textBest=null,e.I=i,i.point=0,i.text=Util.newTextField("0",Util.width/22,FONT_COLOR,.5,0,!0,!0),GameObject.display.addChild(i.text);var s=egret.localStorage.getItem(SAVE_KEY_BESTSCORE);return null==s&&(s="10",egret.localStorage.setItem(SAVE_KEY_BESTSCORE,s)),i.bestScore=parseInt(s),i.textBest=Util.newTextField("BEST:"+s,Util.width/22,FONT_COLOR,0,0,!0,!0),GameObject.display.addChild(i.textBest),i}return __extends(e,t),e.prototype.onDestroy=function(){GameObject.display.removeChild(this.text),this.text=null,GameObject.display.removeChild(this.textBest),this.textBest=null,e.I=null},e.prototype.update=function(){},e.prototype.addPoint=function(t){void 0===t&&(t=1),this.point+=t,this.text.text=""+this.point.toFixed(),this.bestScore<this.point&&(this.bestScore=this.point,this.textBest.text="BEST:"+this.point.toFixed())},e.I=null,e}(GameObject);__reflect(Score.prototype,"Score");var StartMessage=function(t){function e(){var e=t.call(this)||this;return e.texts=[],e.texts[0]=Util.newTextField("ブロックを積み上げよう",Util.width/20,FONT_COLOR,.5,.4,!0,!1),e.texts[1]=Util.newTextField("スワイプで左右に移動",Util.width/20,FONT_COLOR,.5,.5,!0,!1),e.texts.forEach(function(t){GameObject.display.addChild(t)}),GameObject.display.once(egret.TouchEvent.TOUCH_TAP,e.tap,e),e}return __extends(e,t),e.prototype.onDestroy=function(){this.texts.forEach(function(t){GameObject.display.removeChild(t)}),this.texts=null},e.prototype.update=function(){},e.prototype.tap=function(t){Player.I.setStateHold(),this.destroy()},e}(GameObject);__reflect(StartMessage.prototype,"StartMessage");