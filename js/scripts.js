var people = [];

$('#menuToggle').on('click', function() {
  $('nav ul').toggle(400);
});

$('a[data-remote="true"]').on('click', function(e) {
  e.preventDefault();
  $.ajax({
    url: $(this).attr('href') + '?callback=loadResults',
    method: 'get',
    dataType: 'jsonp'
  });
});

$('a[data-remote-mutants="true"]').on('click', function(e) {
  e.preventDefault();
  $.ajax({
    url: $(this).attr('href'),
    method: 'get',
    success: loadMutants
  });
});

$('a[data-remote-pokemon="true"]').on('click', function(e) {
  e.preventDefault();
  $.ajax({
    url: $(this).attr('href'),
    method: 'get',
    success: getAllPokemon
  });
});

function loadResults(data) {
  if (data.firstName) {
    people.push(data);
  }
  else if (data.people) {
    people = people.concat(data.people);
  }
  listPeople();
}

function loadMutants(data) {
  $.each(data, function(i, mutant) {
    people.push({
      firstName: mutant.mutant_name,
      lastName: '[' + mutant.real_name + ']',
      secret: mutant.power
    });
  });
  listPeople();
}

function getAllPokemon(data) {
  $.each(data.results, function(i, pokemon) {
    $.ajax({
      url: pokemon.url,
      method: 'get',
      success: loadPokemon
    });
  });
  setTimeout(function() {
    listPeople();
  }, 5000);
}

function loadPokemon(pokemon) {
  people.push({
    firstName: pokemon.name,
    lastName: '',
    secret: pokemon.abilities[0].ability.name
  });
}

function listPeople() {
  $('#people').slideUp();
  $('#people').empty();
  $.each(people, function(index, person) {
    var item = $('#template').clone().attr('id', '');
    item.html(item.html().replace('{{ person.firstName }}', person.firstName)
      .replace('{{ person.lastName }}', person.lastName)
      .replace('{{ person.secret }}', person.secret))
      .removeClass('hide');
    $('#people').append(item);
  });

  $('#people').slideDown();
}



listPeople();
