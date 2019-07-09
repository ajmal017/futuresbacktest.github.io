function parse_querystring() {
	var qs = window.location.search;
	if (qs !== '') {
		qs = qs.split('&');
		qs[0] = qs[0].slice(1);
		qs = qs.reduce((a, e) => {
			a[e.split('=')[0]] = e.split('=')[1];
			return a;
		}, {});
	} else {
		qs = {};
	}
	return qs;
}
function set_querystring_arg(name, value, pathonly=false) {
	var qs = parse_querystring();
	if (value === null) {
		qs[name] = undefined;
	} else {
		qs[name] = value;
	}
	qs = '?' + Object.entries(qs).map(e => e[0] + '=' + e[1]).join('&');
	if (history && history.replaceState && !pathonly) {
	    window.history.replaceState(null, '', window.location.pathname + qs);
	}
	return window.location.pathname + qs;
}

$(document).ready(function(){

  if ($(document).width() >= 992) {
    /*
    let menu = $('#menu-nav').find('li').has('a[href$="'+document.location.pathname+'"]').eq(0);
    let content = $('#content');
    let titles = content.find('h2');
    let submenu = $('<ul></ul>');
    for (let t of titles) {
      let tg = t.innerHTML.replace(/\s/g,'-').toLowerCase() + '-anch';
      $('<a id="'+tg+'"></a>').insertBefore(t);
      submenu.append($('<li><a class="subtitle" href="#'+tg+'">'+t.innerHTML+'</a></li>'));
    }
    menu.append(submenu);
    $("a[href^='#']").click(function(){
      var id = $(this).attr('href');
      $('html, body').animate( { scrollTop: $(id).offset().top }, 500);
      return false;
    });*/
  } else {
    $('body').append('<div id="to-top"><a href="#"></a></div>')
    var button = $('<a href="#"><i class="fas fa-angle-up"></i></a>').on('click', function(){
       $("html, body").animate({scrollTop : 0}, 750);
    });
    $('body').append($('<div id="to-top"></div>').append(button));
    $('html, body').animate( { scrollTop: $('#content').offset().top - 70 }, 750);
  }


 // collapsible sections
$("#content h4.collapsible").each(function(index){
  var el = $(this);
  el.nextUntil("h3, h2, h1").wrapAll('<div id="coll'+index+'"></div>');
  var bl = $('#coll'+index);
  bl.css("display", "none");
  el.click(function(){
    bl.css("display", bl.css("display") === "block" ? "none" : "block");
  });
});

  // pills sections
$("#content h1, h2").each(function(i1){
  var pills = $(this).nextUntil("h1, h2", "h3.makepill");
  var pillsUl = $('<ul class="nav nav-pills"></ul>');
  var firstPill;
  pills.each(function(i2){
	  var pill = $(this);
	  var pillId = pill.attr('id');
	  var qs = parse_querystring()['sel' + i1];
	  var cl = (qs && qs === pillId) || (!qs && i2 === 0) ? "active pill-div" : "pill-div";
		var cl2 = (qs && qs === pillId) || (!qs && i2 === 0) ? ' class="active nav-item"' : ' class="nav-item"';
		var cl3 = (qs && qs === pillId) || (!qs && i2 === 0) ? "active nav-link" : "nav-link";
	  var tg = set_querystring_arg('sel' + i1, pillId, true);
	  pill.nextUntil("h1, h2, h3.makepill").wrapAll('<div id="pill_'+i1+'_'+i2+'" class="'+cl+'"></div>');
	  var pillLi = $('<li'+cl2+'><a href="' + tg + '" class="' + cl3 + '">'+pill.text()+'</a></li>');
	  if (qs && qs === pillId && i2 !== 0) {
	  	$('link[rel="canonical"]').attr('href', 'https://www.futuresbacktest.com' + tg);
	  }
	  pillLi.click(function(e){
		e.preventDefault();
		pillsUl.find("li").removeClass("active");
		$(this).addClass("active");
		$('#tabs_'+i1+' .pill-div').removeClass("active");
		$('#pill_'+i1+'_'+i2).addClass("active");
		set_querystring_arg('sel' + i1, pillId);
	  });
	  pillsUl.append(pillLi);
	  if (i2 === 0) firstPill = pill; else pill.remove();
  });
  if (firstPill) {
    firstPill.after(pillsUl);
    firstPill.remove();
    $(this).nextUntil("h1, h2").wrapAll('<div id="tabs_'+i1+'"></div>');
  }
});

$(".navbar").headroom();

});
