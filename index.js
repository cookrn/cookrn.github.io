(function(){
  var init = function init(){
    loadProjects();
    loadRepos();
  };

  var loadProjects = function loadProjects(){
    var container   = document.getElementById( 'project_list' )
      , project_url = 'projects.json'
      , request     = new XMLHttpRequest;

    request.open(
      'GET'
    , project_url
    , true
    );

    request.onload = function(){
      if( request.status >= 200 && request.status <= 400 ){
        var projects = JSON.parse( request.responseText )

        projects.forEach( function( project ){
          var li   = document.createElement( 'li' )
            , link = document.createElement( 'a' )
            , desc = document.createTextNode( ': ' + project.description );

          li.classList.add( 'project-list-item' );

          link.setAttribute(
            'href'
          , project.url
          );

          link.innerText = project.name;
          li.appendChild( link );
          li.appendChild( desc );
          container.appendChild( li );
        } );
      } else {}
    }

    request.onerror = function(){};
    request.send();
  };

  var loadRepos = function loadRepos(){
    var container = document.getElementById( 'repo_list' )
      , repo_url  = 'repos.json'
      , request   = new XMLHttpRequest;

    request.open(
      'GET'
    , repo_url
    , true
    );

    request.onload = function(){
      if( request.status >= 200 && request.status <= 400 ){
        var repos = JSON.parse( request.responseText )

        repos.forEach( function( repo ){
          var li         = document.createElement( 'li' )
            , header     = document.createElement( 'h3' )
            , link       = document.createElement( 'a' )
            , badge_list = document.createElement( 'ul' )
            , desc       = document.createElement( 'p' );

          badge_list.classList.add( 'badge-list' );
          header.classList.add( 'repo-header' );
          li.classList.add( 'repo-list-item' );
          desc.classList.add( 'repo-description' );

          desc.innerText = repo.description;

          link.setAttribute(
            'href'
          , 'https://github.com/' + repo.github_user + '/' + repo.name
          );

          if( repo.badges ){
            repo.badges.forEach( function( badge ){
              var badge_li        = document.createElement( 'li' )
                , badge_link      = document.createElement( 'a' )
                , badge_image     = document.createElement( 'img' )
                , badge_image_url = badge[ 0 ]
                , badge_href_url  = badge[ 1 ];

              badge_li.classList.add( 'badge-list-item' );
              badge_link.classList.add( 'badge-link' );

              badge_link.setAttribute(
                'href'
              , badge_href_url
              );

              badge_image.setAttribute(
                'src'
              , badge_image_url
              );

              badge_link.appendChild( badge_image );
              badge_li.appendChild( badge_link );
              badge_list.appendChild( badge_li );
            } );
          }

          link.innerText = 'link';
          header.innerText = repo.name;
          li.appendChild( header );
          li.appendChild( link );
          li.appendChild( desc );
          li.appendChild( badge_list );
          container.appendChild( li );
        } );
      } else {}
    }

    request.onerror = function(){};
    request.send();
  };

  init();
})();
