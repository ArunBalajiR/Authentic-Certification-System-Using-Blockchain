const express = require('express')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()
const mongoose = require ('mongoose')
const nodeMail = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');


const transporter = nodeMail.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  auth: {
    user: 'certificationauthority@hotmail.com',
    pass: 'Arun@project2022',
  }
  
});

const transaction = require('./models/certauth.model');
const { errorHandler } = require('./helpers/dbErrorHandling')

//Config .env to ./config/config.env
require('dotenv').config({
    path:'./config/config.env'
})

//Connect to Database
const uri = process.env.MONGO_URI
mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
    }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log ("MongoDB database connection established successfully");
})

//Use bodyParser
app.use(bodyparser.json())

//Load all routes
const authRouter = require('./routes/auth.route')
const userRouter = require('./routes/user.route')

//config for only development
if(process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))

    app.use(morgan('dev'))
    //Morgan give information about each request
    //Cors it's allow to deal with react for localhost at port 3000 without any problem
}
//Use Routes
app.use('/api/',authRouter);
app.use('/api', userRouter);


//client-mail
app.post('/api/smail', (req, res, next) => {
    
    console.log(req.body)
    const email = req.body.z
    const emailData = {
        to: email,
        from: process.env.EMAIL_FROM,
        fromname: 'Anna University',
        subject: 'Graduation Certificate',
        html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif">
         <head> 
          <meta charset="UTF-8"> 
          <meta content="width=device-width, initial-scale=1" name="viewport"> 
          <meta name="x-apple-disable-message-reformatting"> 
          <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
          <meta content="telephone=no" name="format-detection"> 
          <title>Certificate</title> 
          <!--[if (mso 16)]>
            <style type="text/css">
            a {text-decoration: none;}
            </style>
            <![endif]--> 
          <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
          <!--[if gte mso 9]>
        <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]--> 
          <style type="text/css">
        .rollover div {
          font-size:0;
        }
        .rollover:hover .rollover-first {
          max-height:0px!important;
          display:none!important;
        }
        .rollover:hover .rollover-second {
          max-height:none!important;
          display:block!important;
        }
        #outlook a {
          padding:0;
        }
        .es-button {
          mso-style-priority:100!important;
          text-decoration:none!important;
        }
        a[x-apple-data-detectors] {
          color:inherit!important;
          text-decoration:none!important;
          font-size:inherit!important;
          font-family:inherit!important;
          font-weight:inherit!important;
          line-height:inherit!important;
        }
        .es-desk-hidden {
          display:none;
          float:left;
          overflow:hidden;
          width:0;
          max-height:0;
          line-height:0;
          mso-hide:all;
        }
        [data-ogsb] .es-button {
          border-width:0!important;
          padding:15px 35px 15px 35px!important;
        }
        .es-button-border:hover a.es-button, .es-button-border:hover button.es-button {
          background:#C97F32!important;
          border-color:#C97F32!important;
          color:#ffffff!important;
        }
        .es-button-border:hover {
          border-color:#f5a243 #f5a243 #f5a243 #f5a243!important;
          background:#C97F32!important;
          border-style:solid solid solid solid!important;
        }
        [data-ogsb] .es-button.es-button-1 {
          padding:15px 55px 15px 60px!important;
        }
        td .es-button-border:hover a.es-button-2 {
          background:#657bdd!important;
          border-color:#657bdd!important;
        }
        td .es-button-border-3:hover {
          background:#657bdd!important;
          border-color:#657bdd #657bdd #657bdd #657bdd!important;
        }
        td .es-button-border:hover a.es-button-4 {
          background:#657BDD!important;
          border-color:#657BDD!important;
        }
        td .es-button-border-5:hover {
          background:#657BDD!important;
          border-color:#657BDD #657BDD #657BDD #657BDD!important;
        }
        @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
        </style> 
         </head> 
         <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
          <div class="es-wrapper-color" style="background-color:#040404"> 
           <!--[if gte mso 9]>
              <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                <v:fill type="tile" src="https://uyplzb.stripocdn.email/content/guids/CABINET_6ccb1c1ade90c95642045bd4a7fd2a35/images/nwdn_file_temp_1645083299169_qmn.jpg" color="#040404" origin="0.5, 0" position="0.5, 0"></v:fill>
              </v:background>
            <![endif]--> 
           <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" background="https://uyplzb.stripocdn.email/content/guids/CABINET_6ccb1c1ade90c95642045bd4a7fd2a35/images/nwdn_file_temp_1645083299169_qmn.jpg" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-image:url(https://uyplzb.stripocdn.email/content/guids/CABINET_6ccb1c1ade90c95642045bd4a7fd2a35/images/nwdn_file_temp_1645083299169_qmn.jpg);background-repeat:no-repeat;background-position:center -100px"> 
             <tr> 
              <td valign="top" style="padding:0;Margin:0"> 
               <table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
                 <tr> 
                  <td align="center" style="padding:0;Margin:0"> 
                   <table class="es-header-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"> 
                     <tr> 
                      <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr> 
                          <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                           <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr> 
                              <td align="center" height="239" style="padding:0;Margin:0"></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                     <tr> 
                      <td align="left" bgcolor="#ffffff" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;background-color:#ffffff"> 
                       <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr> 
                          <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                           <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr> 
                              <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#C97F32;font-size:14px"><img src="https://uyplzb.stripocdn.email/content/guids/CABINET_6ccb1c1ade90c95642045bd4a7fd2a35/images/logo.png" alt="Logo" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="100" title="Logo"></a></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table> 
               <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                 <tr> 
                  <td align="center" style="padding:0;Margin:0"> 
                   <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
                     <tr> 
                      <td align="left" style="Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;padding-bottom:30px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr> 
                          <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                           <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr> 
                              <td align="center" style="padding:0;Margin:0;padding-top:10px"><h1 style="Margin:0;line-height:46px;mso-line-height-rule:exactly;font-family:georgia, times, 'times new roman', serif;font-size:38px;font-style:normal;font-weight:normal;color:#010812">Hello, <span style="color:#657bdd"> ${req.body.y}.</span> Congratulations!</h1></td> 
                             </tr> 
                             <tr> 
                              <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:georgia, times, 'times new roman', serif"><br><strong>Greetings from KLN College Of Engineering&nbsp;</strong></h4><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#2F3F67;font-size:14px"><br><br>Congratulations on completing your degree. Building this kind of momentum is exciting. Every new skill and concept you learn opens up new possibilities for progress, and putting in the hardwork leads to great results.</p></td> 
                             </tr> 
                             <tr> 
                              <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#2F3F67;font-size:14px"><br><br><span style="font-size:15px">You can download your certificate by clicking below.&nbsp;<br>&nbsp;Your Certificate ID&nbsp; is</span><br><br></p><h5 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'courier new', courier, 'lucida sans typewriter', 'lucida typewriter', monospace;color:#000000">${req.body.x}</h5></td> 
                             </tr> 
                             <tr> 
                              <td align="center" style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px"> 
                               <!--[if mso]><a href="https://arunbalaji.tech" target="_blank" hidden>
          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://arunbalaji.tech" 
                        style="height:51px; v-text-anchor:middle; width:279px" arcsize="0%" strokecolor="#2f3f67" strokeweight="1px" fillcolor="#ffffff">
            <w:anchorlock></w:anchorlock>
            <center style='color:#2f3f67; font-family:arial, "helvetica neue", helvetica, sans-serif; font-size:16px; font-weight:400; line-height:16px;  mso-text-raise:1px'>Download your Certificate</center>
          </v:roundrect></a>
        <![endif]--> 
                               <!--[if !mso]><!-- --><span class="msohide es-button-border es-button-border-3" style="border-style:solid;border-color:#2F3F67;background:#FFFFFF;border-width:1px;display:inline-block;border-radius:0px;width:auto;mso-hide:all"><a href="https://arunbalaji.tech" class="es-button es-button-2" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#2F3F67;font-size:18px;border-style:solid;border-color:#FFFFFF;border-width:15px 35px 15px 35px;display:inline-block;background:#FFFFFF;border-radius:0px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center">Download your Certificate</a></span> 
                               <!--<![endif]--></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table> 
               <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                 <tr> 
                  <td align="center" style="padding:0;Margin:0"> 
                   <table bgcolor="#efefef" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#efefef;width:600px"> 
                     <tr> 
                      <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr> 
                          <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                           <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr> 
                              <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;padding-top:10px"><h1 style="Margin:0;line-height:46px;mso-line-height-rule:exactly;font-family:georgia, times, 'times new roman', serif;font-size:38px;font-style:normal;font-weight:normal;color:#2F3F67">All the Best !</h1></td> 
                             </tr> 
                             <tr> 
                              <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#2F3F67;font-size:14px">On the start of your career from the management,Principal and faculty,</p></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table> 
               <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                 <tr> 
                  <td align="center" style="padding:0;Margin:0"> 
                   <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
                     <tr> 
                      <td align="left" style="Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;padding-bottom:30px"> 
                       <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]--> 
                       <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                         <tr> 
                          <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:270px"> 
                           <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr> 
                              <td align="right" class="es-m-txt-c" style="padding:0;Margin:0"> 
                               <!--[if mso]><a href="https://arunbalaji.tech" target="_blank" hidden>
          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://arunbalaji.tech" 
                        style="height:51px; v-text-anchor:middle; width:121px" arcsize="0%" strokecolor="#2f3f67" strokeweight="1px" fillcolor="#ffffff">
            <w:anchorlock></w:anchorlock>
            <center style='color:#2f3f67; font-family:arial, "helvetica neue", helvetica, sans-serif; font-size:16px; font-weight:400; line-height:16px;  mso-text-raise:1px'>Share</center>
          </v:roundrect></a>
        <![endif]--> 
                               <!--[if !mso]><!-- --><span class="es-button-border msohide es-button-border-5" style="border-style:solid;border-color:#2F3F67;background:#FFFFFF;border-width:1px;display:inline-block;border-radius:0px;width:auto;mso-hide:all"><a href="https://arunbalaji.tech" class="es-button es-button-4" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#2F3F67;font-size:18px;border-style:solid;border-color:#FFFFFF;border-width:15px 35px 15px 35px;display:inline-block;background:#FFFFFF;border-radius:0px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center">Share</a></span> 
                               <!--<![endif]--></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table> 
                       <!--[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]--> 
                       <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                         <tr> 
                          <td align="left" style="padding:0;Margin:0;width:270px"> 
                           <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr> 
                              <td align="left" class="es-m-txt-c" style="padding:0;Margin:0"> 
                               <!--[if mso]><a href="https://arunbalaji.tech" target="_blank" hidden>
          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://arunbalaji.tech" 
                        style="height:51px; v-text-anchor:middle; width:163px" arcsize="0%" strokecolor="#2f3f67" strokeweight="1px" fillcolor="#ffffff">
            <w:anchorlock></w:anchorlock>
            <center style='color:#2f3f67; font-family:arial, "helvetica neue", helvetica, sans-serif; font-size:16px; font-weight:400; line-height:16px;  mso-text-raise:1px'>Verify</center>
          </v:roundrect></a>
        <![endif]--> 
                               <!--[if !mso]><!-- --><span class="es-button-border msohide es-button-border-5" style="border-style:solid;border-color:#2F3F67;background:#FFFFFF;border-width:1px;display:inline-block;border-radius:0px;width:auto;mso-hide:all"><a href="https://arunbalaji.tech" class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#2F3F67;font-size:18px;border-style:solid;border-color:#FFFFFF;border-width:15px 55px 15px 60px;display:inline-block;background:#FFFFFF;border-radius:0px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center">Verify</a></span> 
                               <!--<![endif]--></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table> 
                       <!--[if mso]></td></tr></table><![endif]--></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table> 
               <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                 <tr> 
                  <td align="center" style="padding:0;Margin:0"> 
                   <table bgcolor="#efefef" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#efefef;width:600px"> 
                     <tr> 
                      <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:30px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr> 
                          <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                           <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr> 
                              <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#2F3F67;font-size:14px">Designed and Developed by<br> ArunBalaji R<br>Gokul K<br>&nbsp;Arun Kumar M</p></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table> 
               <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
                 <tr> 
                  <td align="center" style="padding:0;Margin:0"> 
                   <table bgcolor="#ffffff" class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
                     <tr> 
                      <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:40px;padding-bottom:40px"> 
                       <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:194px" valign="top"><![endif]--> 
                       <table cellpadding="0" cellspacing="0" align="left" class="es-left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                         <tr> 
                          <td class="es-m-p20b" align="center" valign="top" style="padding:0;Margin:0;width:174px"> 
                           <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr> 
                              <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#C97F32;font-size:14px"><img src="https://uyplzb.stripocdn.email/content/guids/CABINET_6ccb1c1ade90c95642045bd4a7fd2a35/images/logo_whC.png" alt="Logo" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="100" title="Logo"></a></td> 
                             </tr> 
                           </table></td> 
                          <td class="es-hidden" style="padding:0;Margin:0;width:20px"></td> 
                         </tr> 
                       </table> 
                       <!--[if mso]></td><td style="width:173px" valign="top"><![endif]--> 
                       <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                         <tr> 
                          <td align="left" class="es-m-p20b" style="padding:0;Margin:0;width:173px"> 
                           <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;border-left:1px solid #ffffff;border-right:1px solid #ffffff" role="presentation"> 
                             <tr> 
                              <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:28px;color:#2F3F67;font-size:14px"><a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#C97F32;font-size:14px;line-height:28px" href="https://viewstripo.email">Classes</a></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:28px;color:#2F3F67;font-size:14px"><a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#C97F32;font-size:14px;line-height:28px" href="https://viewstripo.email">Teachers</a><br><a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#C97F32;font-size:14px;line-height:28px" href="https://viewstripo.email">Events</a><br><a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#C97F32;font-size:14px;line-height:28px" href="https://viewstripo.email">Blog</a></p></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table> 
                       <!--[if mso]></td><td style="width:20px"></td><td style="width:173px" valign="top"><![endif]--> 
                       <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                         <tr> 
                          <td align="left" style="padding:0;Margin:0;width:173px"> 
                           <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr> 
                              <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;font-size:0"> 
                               <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                 <tr> 
                                  <td align="center" valign="top" style="padding:0;Margin:0;padding-right:15px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#C97F32;font-size:14px"><img title="Facebook" src="https://uyplzb.stripocdn.email/content/assets/img/social-icons/logo-colored/facebook-logo-colored.png" alt="Fb" width="24" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td> 
                                  <td align="center" valign="top" style="padding:0;Margin:0;padding-right:15px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#C97F32;font-size:14px"><img title="Instagram" src="https://uyplzb.stripocdn.email/content/assets/img/social-icons/logo-colored/instagram-logo-colored.png" alt="Inst" width="24" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td> 
                                  <td align="center" valign="top" style="padding:0;Margin:0"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#C97F32;font-size:14px"><img title="Youtube" src="https://uyplzb.stripocdn.email/content/assets/img/social-icons/logo-colored/youtube-logo-colored.png" alt="Yt" width="24" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td> 
                                 </tr> 
                               </table></td> 
                             </tr> 
                             <tr> 
                              <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#2F3F67;font-size:12px">© Copyright<br>All Right Reserved.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#2F3F67;font-size:14px"><a href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#C97F32;font-size:12px" target="_blank">Privacy Policy</a></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#2F3F67;font-size:14px"><a href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#C97F32;font-size:12px" target="_blank">Terms of use</a><br></p></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table> 
                       <!--[if mso]></td></tr></table><![endif]--></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table> 
               </td> 
             </tr> 
           </table> 
          </div>  
         </body>
        </html>
              `,
        };


      transporter.sendMail(emailData, function(err, info) {
        if (err) {
          console.log(err)
        }
        console.log("sent")
      });

      const tid = req.body.t
      const usn = req.body.u
      const cert_id = req.body.x

      // console.log(tid)
      
      const certx = new transaction({
        usn,
        tid,
        email,
        cert_id
      });

      certx.save((err, certx) => {
        if (err) {
          console.log('Save error', errorHandler(err));
          return res.status(401).json({
            errors: errorHandler(err)
          });
        } else {
          return res.json({
            success: true,
            message: 'Transaction details sent!!',
          });
        }
      });
})

app.post('/api/idfetch', (req, res, next) => {
  const usn = req.body.id
  //console.log(usn)
  transaction.findOne({
      usn
    }).exec((err, tid) => {
      return  res.send(tid)
  })
});

app.get('/api/getrapi', (req, res, next) => {
      return  res.send(process.env.INFURA_API_KEY)
});

app.get('/api/rdefault', (req, res, next) => {
  return  res.send(process.env.ROPSTEN_DEFAULT_ACCOUNT)
});



app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Page not found"
    })
});
const PORT = process.env.PORT

var listener = app.listen(PORT, function() {
    console.log(`App listening on port ${PORT}`); //Listening on port 8888
});