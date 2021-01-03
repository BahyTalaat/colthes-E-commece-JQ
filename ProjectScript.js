$(document).ready(function()
   {
     var currentuser=$(".CurrentUser");
    //  var UsersArray=new Array();
    var UsersArray=JSON.parse(localStorage.getItem("users"));
    //  console.log(UsersArray)
   var usercount=localStorage.getItem("usercount");
    //  var usercount=0;



   
    var dialogg;
    $("#login_btn").click(function()
            {
                dialogg= $(".SignInAside").dialog(
                   {
                    
                    height: 400,
                    width: 350,
                    modal: true,
                    buttons: {
                      "Log in": CheckUser,
                      Cancel: function()
                         {
                         dialogg.dialog( "close" );
                         },
                        'Cancel':function()
                            {
                            dialogg.dialog( "close" );
							              }
                          }
                  });
            
            
            })

            $("#signUp_btn").click(function()
            {
              dialogg= $(".Signupaside").dialog(
                   {
                   
                       height: 400,
                       width: 350,
                       modal: true,
                    buttons: 
                    {
                        "Create an account": addUser,
                         Cancel: function()
                            {
                            dialogg.dialog( "close" );
                            },
                        'Cancel':function()
                            {
                            dialogg.dialog( "close" );
						                 }
                    }
                 })
               })

    $(".change_account").click(function()
            {
              dialogg= $(".ChangeUserNameOrPassword").dialog(
                   {
                   
                       height: 400,
                       width: 350,
                       modal: true,
                    buttons: 
                    {
                        "Submit": confirmChange,
                         Cancel: function()
                            {
                            dialogg.dialog( "close" );
                            },
                        'Cancel':function()
                            {
                            dialogg.dialog( "close" );
						                 }
                    }
                 })
               })




            
            $( "#menu" ).menu();
            $("#asideImg1").hover(function()
            {
              $(this).attr("class","mb-2 col-sm-12");
              $(this).css("height","250px");

            },
            function()
            {
              $(this).attr("class","mb-2 col-sm-10");
              $(this).css("height","200px");

            })
            $("#asideImg2").hover(function()
            {
              $(this).attr("class","mb-2 col-sm-12");
              $(this).css("height","250px");

            },
            function()
            {
              $(this).attr("class","mb-2 col-sm-10");
              $(this).css("height","200px");

            })


            $(".childrenIMG").hover(function()
            {
              $(this).css("box-shadow", "5px 5px 5px 5px #888888");
            },
            function(){
              $(this).css('box-shadow','none');
            })


            /////////////////////////////check validity
            var  form,
 
      // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
      emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      
      Name = $( "#name" ),
      email = $( "#email" ),
      password = $( "#password" ),
      allFields = $( [] ).add(Name ).add( email ).add( password ),
      tips = $(".validateTips" );
 
    function updateTips(t) {
      tips.text( t ).addClass( "ui-state-highlight" );
            setTimeout(function() {
                tips.removeClass( "ui-state-highlight", 1500 );
            }, 500 );
    }
 
    function checkLength(inputval, ElementName, min, max ) {
      if ( inputval.val().length > max || inputval.val().length < min ) {
         inputval.addClass( "ui-state-error" );
        updateTips( "Length of " + ElementName + " must be between " +
          min + " and " + max + "." );
         return false;
      } else {
        return true;
      }
    }
 
    function checkRegexp( inputval, regexp, meassage ) {
      if ( !( regexp.test( inputval.val() ) ) ) {
        inputval.addClass( "ui-state-error" );
        updateTips(meassage );
        return false;
      } 
      else {
        return true;
        }
    }
 
    function addUser()
    {
      var valid = true;
      allFields.removeClass("ui-state-error");
 
          valid = valid && checkLength( Name, "username", 3, 16 );
          valid = valid && checkLength( email, "email", 6, 80 );
          valid = valid && checkLength( password, "password", 5, 16 );

          valid = valid && checkRegexp( Name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
          valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
          valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
    
      if ( valid ) 
         {
            dialogg.dialog( "close" );
             alert("Done");
             var NewUser={"userID":"nullID","fullname":"NullName","Email":"NullEmail","Password":"NullPassword","products":[],"productCount":0};
             NewUser.fullname=Name.val();
             NewUser.Email=email.val();
             NewUser.Password=password.val();
             if(usercount==null)
             {
              usercount=0;
              UsersArray=new Array();
             }
             NewUser.userID=usercount;
             localStorage.setItem("CurrentuserID",JSON.stringify(NewUser.userID));
            //  UsersArray[usercount]=NewUser;
            //  localStorage.setItem("user"+usercount,JSON.stringify(UsersArray[usercount]));
             UsersArray[usercount]=NewUser;
             localStorage.setItem("users",JSON.stringify(UsersArray));
             
             localStorage.setItem("logeduser",JSON.stringify(NewUser.fullname));
             usercount++;
             localStorage.setItem("usercount",usercount);
             location.reload();
           }
          return valid;
    }
//////////////////////////check log in 

  var LogName=$("#LogName");
  var LogPassword=$("#LogPassword");
  var checkNP=$("#CheckMessage");
    function CheckUser()
        {
          if(LogName.val()=='' || LogPassword.val()=='')
          {
             updateTips("All form fields are required.");
          }
          else 
           {
            for(var i=0;i<UsersArray.length;i++)
              {
                if(LogName.val()==UsersArray[i].fullname && LogPassword.val()==UsersArray[i].Password)
                   {
                      alert("Welcome");
                      localStorage.setItem("CurrentuserID",JSON.stringify(UsersArray[i].userID));

                      dialogg.dialog( "close" );
                      localStorage.setItem("logeduser",JSON.stringify(UsersArray[i].fullname))
                      location.reload();
                      
                   }   
              }
              updateTips("Make sure from user name or password is correct");

           }
         
        }

 ///////////////////////////////////// change account
   var NewName=$("#NewName");
    var NewEmail=$("#NewEmail");
    var NewPassword=$("#NewPassword");
    var CheckMessageforChange=$("#CheckMessageforChange");

   //var tipForChange= $(".validateTips" );
 function confirmChange()
     {
      if(NewName.val()=='' && NewEmail.val()=='' && NewPassword.val()=='')
      {
         updateTips("you should Make change  to submit");
      }
      else
      {
        var alluserregister=JSON.parse(localStorage.getItem("users"));
        var CurrentuserID=JSON.parse(localStorage.getItem('CurrentuserID'));
  
        if($.trim(currentuser.html())=='')
                {
                  updateTips("You should register first or log in");
                }
          else
            {
           

              if(NewName.val()!='')
                 alluserregister[CurrentuserID].fullname=NewName.val();

            if(NewEmail.val()!='')
                 alluserregister[CurrentuserID].Email= NewEmail.val();
               
            if(NewPassword.val()!='')
                 alluserregister[CurrentuserID].Password=NewPassword.val();

               localStorage.setItem("logeduser",JSON.stringify(alluserregister[CurrentuserID].fullname))
                localStorage.setItem("users",JSON.stringify(alluserregister));
                dialogg.dialog( "close" );
                location.reload();

            }      
      }

     }
 
 /////////////////////////////////////
 
 if (localStorage.getItem('logeduser') != null)
      {
         currentuser.text(JSON.parse(localStorage.getItem("logeduser")));
      }
  else 
    {
      currentuser.text("");
    }           
           

    ////////////////////////////// comments
    var AllCommentsArray=JSON.parse(localStorage.getItem("Allcomments"));
    var commentcount=JSON.parse(localStorage.getItem("commentcount"));

    var CommentInput=$("#CommentInput");
    var CommentSubmit=$("#CommentSubmit");
       var tip=$(".validateComment");   

    function CommentEmpty(t){
      tip.text(t).addClass( "ui-state-highlight" );
            setTimeout(function() {
                tip.removeClass( "ui-state-highlight", 5000 );
                tip.text('');
            }, 5000);
    }
  
    CommentSubmit.click(function()
       {
        
           if(CommentInput.val()=='')
              {
                CommentEmpty("Please Enter Your Comment First");
              }
              else
              {
                if($.trim(currentuser.html())=='')
                {
                  CommentEmpty("Can not add comment with out register or log in");
                }
                else
                {
                      var d = new Date();
                      var commentTime = d.toLocaleString();
                      var divcontainer=$("<div></div>");
                      var para1=$("<p></p>").text(CommentInput.val()); 
                      var para2=$("<p></p>").text(commentTime); 
                      var para3=$("<p></p>").text(" by "+currentuser.text()); 
                      divcontainer.append(para1,para2,para3);
                      divcontainer.addClass("Commentborder");
                    $("#CommentDiv").append(divcontainer);

                      if(AllCommentsArray==null)
                        {
                          AllCommentsArray=new Array();
                          commentcount=0;
                        }
                        var comment={"comment":CommentInput.val(),"CommentDate":commentTime,"CommentUser":currentuser.text()};
                        AllCommentsArray[commentcount]=comment;
                        localStorage.setItem("Allcomments",JSON.stringify(AllCommentsArray));
                        commentcount++;
                        localStorage.setItem("commentcount",commentcount);
                }
                  
              }

       })

///////////////////////Add to cart
var alluserregister=JSON.parse(localStorage.getItem("users")); 
var product_Count;
var useridentifier;
if (localStorage.getItem('CurrentuserID') != null)
      {
       var useridentifier=JSON.parse(localStorage.getItem("CurrentuserID"));
       product_Count=alluserregister[useridentifier].productCount;

      }
  else 
    {
      product_Count=0;
    }      
      
var AllProductsArray=[{"id":1,"name":"Kriki-adress","Description":"adress for children","newprice":420,"oldprice":900,"Img":"1.jpg","precentdiscount":30}
                       ,{"id":2,"name":"mayoral-adress","Description":"adress for children","newprice":500,"oldprice":1200,"Img":"4.jpg","precentdiscount":75}
                       ,{"id":3,"name":"Turkey Shoes","Description":"Shoes for men","newprice":330,"oldprice":500,"Img":"Shoes.webp","precentdiscount":40}
                       ,{"id":4,"name":"Jacket","Description":"Jacket for Women","newprice":1200,"oldprice":1500,"Img":"WomenJacket.jpg","precentdiscount":60}
                       ,{"id":5,"name":"Sweet-shirt","Description":"Sweet-shirt for Boys","newprice":799,"oldprice":1300,"Img":"sweetShirt.jpg","precentdiscount":50}                   
                     ]


var addToCard=$("#AddTocardBtn");
var carditemsnumber=$(".carditemsnumber");
carditemsnumber.text(product_Count);


var tipadd=$(".validateaddtocard");   

    function notregister(t){
      tipadd.text(t).addClass( "ui-state-highlight" );
            setTimeout(function() {
                tipadd.removeClass( "ui-state-highlight", 5000 );
                tipadd.text('');
            }, 5000)};

addToCard.click(function() 
          {

            if($.trim(currentuser.html())=='')
                {
                  notregister("Can not add to card with out register or log in");
                }
                else 
                {
                    if(alluserregister[useridentifier].products==null)
                    {
                      alluserregister[useridentifier].products=new Array();
                      product_Count=0;
                    }               
                    var i=JSON.parse(localStorage.getItem("ProdID"));
                    alluserregister[useridentifier].products[product_Count]=AllProductsArray[i];
                    alluserregister[useridentifier].productCount=(product_Count+1)
                    localStorage.setItem("users",JSON.stringify(alluserregister));
                    carditemsnumber.text(product_Count+1);
                    location.reload();
  
                }

              

          })



        

  /////////////////////////// connect photo with image
  var prodImg=$("#prodImg");
  var productDesc=$("#productDesc");
  var prodnewPrice=$("#prodnewPrice");
  var prodoldprice=$("#prodoldprice");
    var prodSale=$("#prodSale");
  
     $(".product1").click(function()
        {
         localStorage.setItem("ProdID",JSON.stringify($(this).attr("data-id")));
        })

      $("#cardpage").ready(function()
      {
        var i=JSON.parse(localStorage.getItem("ProdID"));
        prodImg.attr("src",AllProductsArray[i].Img);
        productDesc.text(AllProductsArray[i].Description);
        prodoldprice.text("EGP"+AllProductsArray[i].oldprice);
        prodnewPrice.text("EGP"+AllProductsArray[i].newprice);
        prodSale.text("-"+AllProductsArray[i].precentdiscount+"%");

      })
  //////////////////////////Logout

  var Logout=$(".Logout");
  Logout.click(function()
          {
            localStorage.removeItem('CurrentuserID');
            localStorage.removeItem('logeduser');
            // localStorage.setItem("CurrentuserID",'');
            // localStorage.setItem("logeduser",'');
            location.reload();
            // if (localStorage.getItem('key_to_remove') != null)
            // localStorage.removeItem('key_to_remove');

          })
      
  
    

    });


