var express=require("express"),router=express.Router(),Firebase=require("../firebase"),HWS=require("../hws");let ref_current=Firebase.current,ref_log=Firebase.log;router.get("/",function(e,o,r){ref_current.once("value",function(e){let r=Firebase.CurrentTable(e.toJSON());ref_log.once("value",function(e){o.render("info",{title:"WQMS",emulator:{enable:HWS.emulator,interval:HWS.interval},currentTable:r})},function(e){console.log("The read failed: "+e.code)})},function(e){console.log("The read failed: "+e.code)})}),router.get("/:location",function(e,o,r){let n=e.params.location,a=Firebase.getDate("_"),t=Firebase.db.ref(`current_value/${n}`),i=Firebase.db.ref(`log/${n}/${a}`);t.once("value",function(e){let r=Firebase.BasicInfo(e.toJSON());i.once("value",function(e){let a=Firebase.BasicInfoToday(e.toJSON());o.render("info_location",{title:"WQMS",emulator:{enable:HWS.emulator,interval:HWS.interval},location:n,basicInfo:r,basicInfoToday:a})},function(e){console.log("The read failed: "+e.code)})},function(e){console.log("The read failed: "+e.code)})}),router.get("/:location/Data/:period",function(e,o,r){let n=e.params.location,a=e.params.period,t=Firebase.db.ref(`current_value/${n}`),i=Firebase.db.ref(`log/${n}`);t.once("value",function(e){let r=Firebase.BasicInfo(e.toJSON());i.once("value",function(e){let t=e.toJSON(),i=Firebase.searchKeysByPeriod(a,Object.keys(t)),l=Object.keys(t).filter(e=>i.includes(e)).reduce((e,o)=>(e[o]=t[o],e),{});"TM"==a||"LM"==a||"LM3"==a||"LM6"==a||"LM12"==a||"AT"==a?o.render("info_previous",{title:"WQMS",emulator:{enable:HWS.emulator,interval:HWS.interval},location:n,period:a,basicInfo:r,previousInfo:Firebase.PreviousInfo(l)}):o.redirect("/error")},function(e){console.log("The read failed: "+e.code)})},function(e){console.log("The read failed: "+e.code)})}),module.exports=router;