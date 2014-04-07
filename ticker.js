  function jVCT(a,c,d,e,f,g,h,width,height) // This actually builds the ticker inside the specified div.
           {
           var jVCT = this;

           if ((a == undefined)) alert('Unable to initialize ticker.');
           jVCT.holder = a; // Indicates the ticker's container div.
           jVCT.mode = (c != undefined) ?  c : 0; // Indicates mode according to list below:
                     // 0 = Horizontal, right to left, scroll
                     // 1 = Vertical, bottom to top, scroll
                     // 2 = Fade in and out
                     // 3 = Flash in and out
           jVCT.viewControls = (d != undefined) ? d : 1; // Indicates whether the previous and next controls should appear.
           if (e == 'slow') jVCT.travelTime = 20; // Indicates how long it should take for items to scroll. Possible values are the number of seconds from right to left OR slow, medium, fast
           else if (e == 'medium') jVCT.travelTime = 10;
           else if (e == 'fast') jVCT.travelTime = 5;
           else if (typeof(e) == 'number') jVCT.travelTime = e;
           else jVCT.travelTime = 10;           
           jVCT.previousImage = g; // Indicates the source of a custom previous button image
           jVCT.nextImage = h; // Indicates the source of a custom next button image
           jVCT.itemDivs = [] // Initialize the items array.
           jVCT.active = 0; // Set the first ticker item we want to see (i.e., if you want to start with no. 14, you can set this to 13)
           jVCT.scrollTimer;
		   jVCT.items = [];		 // this array contains data pushed in from addTickerElement
           jVCT.container = document.createElement('div');
           jVCT.container.style.width = (jVCT.viewControls) ? (width-70)+'px' : '100%';
           jVCT.container.style.height = height+'px';
           jVCT.container.style.position = 'relative';
           jVCT.container.style.overflow = 'hidden';

           if (jVCT.viewControls)
              {
              jVCT.controls = document.createElement('div'); // Build the control interface
              jVCT.controls.id = 'controls';
              jVCT.controls.style.width = '60px';
              jVCT.controls.style.position = 'relative';
              if (document.all) jVCT.controls.style.styleFloat = 'right';
              else jVCT.controls.style.cssFloat = 'right';
              jVCT.controls.style.fontSize = '8pt';
              jVCT.controls.style.textAlign = 'center';

              jVCT.controls.next = document.createElement('div'); // The next button
              jVCT.controls.previous = document.createElement('div'); // The previous button
              if (jVCT.nextImage)
              {
                     var nextImage = document.createElement('img');
                     nextImage.src = jVCT.nextImage;
                     jVCT.controls.next.appendChild(nextImage);
              }
              else jVCT.controls.next.appendChild(document.createTextNode('>'));
              if (jVCT.previousImage)
              {
                     var prevImage = document.createElement('img');
                     prevImage.src = jVCT.previousImage;
                     jVCT.controls.previous.appendChild(prevImage);
              }
              else jVCT.controls.previous.appendChild(document.createTextNode('<'));
              
			  jVCT.controls.next.style.height = (height-4)+'px';
              jVCT.controls.previous.style.height = (height-4)+'px';
              jVCT.controls.next.style.width = '30px';
              jVCT.controls.previous.style.width = '30px';
              jVCT.controls.next.style.position = 'relative';
              jVCT.controls.previous.style.position = 'relative';
              if (document.all)
              {
                     jVCT.controls.next.style.styleFloat = 'right';
                     jVCT.controls.previous.style.styleFloat = 'left';
              }
              else
              {
                      jVCT.controls.next.style.cssFloat = 'right';
                      jVCT.controls.previous.style.cssFloat = 'right';
              }
              jVCT.controls.previous.title = 'Previous';
              jVCT.controls.next.title = 'Next';
              jVCT.controls.next.style.cursor = 'hand';
              jVCT.controls.previous.style.cursor = 'hand';
              jVCT.controls.previous.onclick = function() { jVCT.previous(jVCT); }
              jVCT.controls.next.onclick = function() { jVCT.next(jVCT); }
              jVCT.controls.appendChild(jVCT.controls.next);
              jVCT.controls.appendChild(jVCT.controls.previous);

              jVCT.holder.appendChild(jVCT.controls);
              }
           jVCT.holder.appendChild(jVCT.container);

           
           }

		function addLoadEvent(func) {
		var oldonload = window.onload;
		if (typeof window.onload != 'function') {
				window.onload = func;
		  } else {
				window.onload = function() {
				  if (oldonload) {
					oldonload();
				  }
				  func();
				}	
		  }
	   }


   var pageLoaded = false;
   addLoadEvent(function() {pageLoaded = true});
   


  
  jVCT.prototype.startTicker = function()
           {

				 var  jVCT = this;
				  if (!pageLoaded)
				  {
					  setTimeout(function() { jVCT.startTicker(); }, 100);
					   return;
				  }
				  
                 for (var i=0;i<jVCT.items.length;i++)
                     {
                     if (jVCT.items[i] == '') continue;
                     var d = document.createElement('div');
                     d.className = 'tickerItem';
                     d.style.position = 'absolute';
                     if (jVCT.mode)
                        {
                        d.style.width = '100%';
						d.style.textAlign = 'center';
                        }
                     else
                         {
                         d.style.whiteSpace = 'nowrap';
                         d.style.paddingRight = '200px';
                         }
                     if (jVCT.mode == 3)
                        {
                        d.style.visibility = 'hidden';
                        }
                     else if (jVCT.mode == 2)
                        {
                        if (document.all) d.style.filter = 'alpha(opacity=0)';
                        else d.style.opacity = 0;
                        }
                     else if (jVCT.mode == 1)
                        {
						  d.style.height=jVCT.container.offsetHeight+'px';
                          d.style.top = jVCT.container.offsetHeight+'px';
                        }
                     else
                         {
                         d.style.left = jVCT.container.offsetWidth+'px';
                         }
                     d.innerHTML = jVCT.items[i];
                     jVCT.container.appendChild(d);
                     jVCT.itemDivs.push(d);
                     }
                 jVCT.scroll();
                 

           }

    

  jVCT.prototype.scroll = function(accelerator)
           {
           var jVCT = this;
			if(pageLoaded) {
           clearTimeout(jVCT.scrollTimer); // Clear the scrollTimer just in case there's another scroll pending.

           var delay = 50;
           if (!accelerator) accelerator = 1;
           accelerator = Math.round(accelerator);
           if ((!jVCT.active) || (jVCT.active >= jVCT.itemDivs.length)) jVCT.active = 0;
           else if (jVCT.active < 0) jVCT.active = jVCT.itemDivs.length-1;

           if (jVCT.mode == 3) // Set the scroll (well, not really) for flash mode
              {
              var a = jVCT.itemDivs[jVCT.active];
              var o;
              if (accelerator > 0) o = jVCT.itemDivs[(jVCT.active+1 >= jVCT.itemDivs.length) ? 0 : jVCT.active+1];
              else o = jVCT.itemDivs[(jVCT.active <= 0) ? jVCT.itemDivs.length-1 : jVCT.active-1];
              var int = Math.round(jVCT.container.offsetHeight/10);
              if ((a.style.visibility == 'visible') && (a.offsetTop+a.offsetHeight > jVCT.container.offsetHeight) && (accelerator == 1))
                 {
                 a.style.top = (a.offsetTop-int)+'px';
				 a.style.left =  (a.offsetL-int)+'px';
                 delay = Math.round((jVCT.travelTime*1000)/((a.offsetHeight-jVCT.container.offsetHeight)/int));
                 if (delay < 500) delay = 500;
                 }
              else
                  {
                  a.style.top = '0px';					  				  
                  if ((a.style.visibility == 'hidden') || (a.style.visibility == ''))
                     {
                     a.style.visibility = 'visible';
					 a.style.left = '0px';

                     }
                  else
                      {
                      a.style.visibility = 'hidden';
                      o.style.visibility = 'visible';
					  o.style.left = '0px';
                      if (accelerator > 0)
                         {
                         jVCT.active = (jVCT.active+1 >= jVCT.itemDivs.length) ? 0 : jVCT.active+1;
                         }
                      else
                          {
                          jVCT.active = (jVCT.active <= 0) ? jVCT.itemDivs.length-1 : jVCT.active-1;
                          }
                      accelerator = 1;
                      }
                  if ((a.style.visibility == 'visible') || (o.offsetHeight <= jVCT.container.offsetHeight)) delay = jVCT.travelTime*1000;
                  }
              }
           else if (jVCT.mode == 2) // Set the scroll (well, not really) for fade mode
              {
              var a = jVCT.itemDivs[jVCT.active];
			  a.style.left='0px';
              var o;
              if (accelerator > 0) o = jVCT.itemDivs[(jVCT.active+1 >= jVCT.itemDivs.length) ? 0 : jVCT.active+1];
              else o = jVCT.itemDivs[(jVCT.active <= 0) ? jVCT.itemDivs.length-1 : jVCT.active-1];

			   o.style.left='0px';
              var step = .1 * Math.abs(accelerator); // How much we want to fade on each round.
              var int = Math.round((jVCT.container.offsetHeight/10) * accelerator); // How much we want to move each round (if the item is too tall to fit)
              var op;
              if (document.all)
                 {
                 var ha = a.style.filter;
                 op = ha.match(/opacity=(\d+)/)[1]/100;
                 }
              else op = a.style.opacity;
              if ((jVCT.active == 0) && (op == 0)) op = 1+step;
              if ((op == 1) && (a.offsetTop+a.offsetHeight > jVCT.container.offsetHeight) && (accelerator > 0))
                 {
                 a.style.top = (a.offsetTop-int)+'px';
                 }
              else
                  {
                  op -= (op-step >= 0) ? step : op;
                  if (document.all)
                     {
                     a.style.filter = 'alpha(opacity='+(op*100)+')';
                     o.style.filter = 'alpha(opacity='+(100-(op*100))+')';
					 a.style.zIndex=	op*100;
					 o.style.zIndex=	100-(op*100);
                     }
                  else
                      {
                      a.style.opacity = op;
                      o.style.opacity = 1-op;
					  a.style.zIndex=	op;
					  o.style.zIndex=	1-op;
                      }
                  }
              if ((op == 1) && (a.offsetHeight <= jVCT.container.offsetHeight) && (accelerator == 1)) delay = jVCT.travelTime*1000;
              else if ((op == 1) && (a.offsetTop+a.offsetHeight > jVCT.container.offsetHeight) && (accelerator == 1))
                   {
                   delay = Math.round((jVCT.travelTime*1000)/((a.offsetHeight-jVCT.container.offsetHeight)/int));
                   if (delay < 500) delay = 500;
                   }
              else if (op == 0)
                 {
                 if (accelerator > 0) jVCT.active = (jVCT.active+1 >= jVCT.itemDivs.length) ? 0 : jVCT.active+1;
                 else jVCT.active = (jVCT.active <= 0) ? jVCT.itemDivs.length-1 : jVCT.active-1;
                 if (o.offsetHeight <= jVCT.container.offsetHeight) delay = jVCT.travelTime*1000;
                 else
                     {
                     delay = Math.round((jVCT.travelTime*1000)/((o.offsetHeight-jVCT.container.offsetHeight)/int));
                     if (delay < 500) delay = 500;
                     }
                 accelerator = 1;
                 }
              }
           else if (jVCT.mode == 1) // Set the scroll for vertical mode
              {
              var a = jVCT.itemDivs[jVCT.active];
			  a.style.left='0px';
              if (accelerator > 0) o = jVCT.itemDivs[(jVCT.active+1 >= jVCT.itemDivs.length) ? 0 : jVCT.active+1];
              else o = jVCT.itemDivs[(jVCT.active <= 0) ? jVCT.itemDivs.length-1 : jVCT.active-1];
              var int = Math.round(jVCT.container.offsetHeight/10) * accelerator;
              if (int == 0) int=1;
              var t = ((a.offsetTop > 0) && (a.offsetTop-int < 0)) ? 0 : a.offsetTop-int;
              a.style.top = t+'px';
              if (accelerator > 0)
                 {
                 if (a.offsetTop+a.offsetHeight < jVCT.container.offsetHeight)
                    {
                    var ot = t+a.offsetHeight;
                    if (ot<0) ot = 0;
                    o.style.top = ot+'px';
                    }
                 if (a.offsetTop <= -(a.offsetHeight))
                    {
                    a.style.top = jVCT.container.offsetHeight+'px';
                    jVCT.active++;
                    accelerator = 1;
                    }
                 }
              else
                  {
                  if (a.offsetTop >= 0)
                     {
                     var ot = t-o.offsetHeight;
                     if (ot>0) ot = 0;
                     o.style.top = ot+'px';
                     }
                  if (o.offsetTop >= 0)
                     {
                     a.style.top = jVCT.container.offsetHeight+'px';
                     jVCT.active--;
                     accelerator = 1;
                     }
                  }
              if (((a.offsetHeight <= jVCT.container.offsetHeight) && (a.offsetTop == 0)) || ((o.offsetHeight <= jVCT.container.offsetHeight) && (o.offsetTop <= 0)) && (accelerator == 1)) delay = jVCT.travelTime*1000;
              else if ((a.offsetTop <= 0) && (a.offsetTop+a.offsetHeight > jVCT.container.offsetHeight) && (accelerator == 1))
                   {
                   delay = Math.round((jVCT.travelTime*1000)/((a.offsetHeight-jVCT.container.offsetHeight)/int));
                   if (delay < 500) delay = 500;
                   }
              }
           else // Set the scroll for horizontal mode
               {
               var int = Math.round(jVCT.container.offsetWidth/(jVCT.travelTime*20));
               if (int <= 0) int = 1;
               int *= accelerator;
               var d = [];
               var w = jVCT.itemDivs[jVCT.active].offsetLeft;
               for (var i=jVCT.active;w<=jVCT.container.offsetWidth;i++)
                  {
                  if (i >= jVCT.itemDivs.length) i = 0;
                  d.push(jVCT.itemDivs[i]);
                  w += jVCT.itemDivs[i].offsetWidth;
                  }
               for (var i=0;i<d.length;i++)
                   {
                   if ((i==0) || (d[i-1].offsetLeft+d[i-1].offsetWidth < jVCT.container.offsetWidth)) d[i].style.left = (d[i].offsetLeft-int)+'px';
                   }
               if ((d[0]) && (d[0].offsetLeft <= -(d[0].offsetWidth)) && (accelerator > 0))
                  {
                  d[0].style.left = jVCT.container.offsetWidth+'px';
                  jVCT.active++;
                  accelerator = 1;
                  }
               else if (((!d[0]) || (d[0].offsetLeft >= 0)) && (accelerator < 0))
                    {
                    var prevItem = jVCT.itemDivs[(jVCT.active > 0) ? jVCT.active-1 : jVCT.itemDivs.length-1];
                    prevItem.style.left = (d[0]) ? (d[0].offsetLeft - prevItem.offsetWidth)+'px' : (prevItem.offsetLeft-int)+'px';
                    if (prevItem.offsetLeft >= 0)
                       {
                       for (var i=0;i<d.length;i++)
                           {
                           d[i].style.left = jVCT.container.offsetWidth+'px';
                           }
                       jVCT.active--;
                       accelerator = 1;
                       }
                    }
               }
			}
           jVCT.scrollTimer = setTimeout(function() { jVCT.scroll(accelerator); }, delay);
           }
  jVCT.prototype.next = function(jVCT)
           {
           jVCT.scroll(((!jVCT.mode) ? 10 : 3));
           }
  jVCT.prototype.previous = function(jVCT)
           {
           jVCT.scroll(((!jVCT.mode) ? -10 : -3));
           }
 

 /*add ticker elemets to the ticker*/
  jVCT.prototype.addTickerElement= function(tickerElement)
  {
	  var jVCT = this;
	  if(jVCT.items == undefined )
	  {
		  jVCT.items = [];
	  }
	  jVCT.items.push((document.getElementById(tickerElement)).innerHTML); 
  }

  

