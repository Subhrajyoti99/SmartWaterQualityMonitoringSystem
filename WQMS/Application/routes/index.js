var express=require("express"),router=express.Router(),Firebase=require("../firebase"),HWS=require("../hws");let ref_current=Firebase.current;router.get("/",function(e,r,t){ref_current.once("value",function(e){let t=e.toJSON(),a=Firebase.Dashboard(t);r.render("index",{title:"WQMS",emulator:{enable:HWS.emulator,interval:HWS.interval},current_values:a})},function(e){console.log("The read failed: "+e.code)})}),router.get("/contact",function(e,r,t){r.render("contact",{title:"WQMS",emulator:{enable:HWS.emulator,interval:HWS.interval}})}),router.get("/emulator/:interval",function(e,r,t){let a=e.params.interval;a=null==a?1e4:parseInt(a),HWS.interval=a,HWS.emulator?(HWS.stop(),HWS.emulator=!1):(HWS.run("Bandel",a),HWS.run("Sugandhya",a),HWS.emulator=!0),r.redirect(e.get("referer"))}),module.exports=router;