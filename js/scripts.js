var people = [
  {
    firstName: 'Tony',
    lastName: 'Stark',
    secret: 'He is an Avenger.'
  }
];

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

function loadResults(data) {
  if (data.firstName) {
    people.push(data);
  }
  else if (data.people) {
    people = people.concat(data.people);
  }
  listPeople();
}

function listPeople() {
  $('#people').slideUp();
  $('#people').empty();
  $.each(people, function(index, person) {
    var item = $('#template').clone().attr('id', '');
    item.html(item.html().replace('{{ person.firstName }}', person.firstName)
      .replace('{{ person.lastName }}', person.lastName)
      .replace('{{ person.secret }}', person.secret));
    $('#people').append(item);
    item.removeClass('hidden');
    $('#people').slideDown();
  });
}

listPeople();
