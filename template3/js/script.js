Get_request = {
    normal: function(json_file, thumb_path) {
        $.get('shop.html', function(data) {
            $('main').html(data)
            $.get('json/' + json_file, function(data) {
                $('#aside-right').empty()
                $('#aside-right').append('<div class = "row" id="aside-row"> </div>')
                Object.entries(data).forEach(function(entry) {
                    let brand = entry[0]
                    for (i = 0; i < Object.keys(entry[1]).length - 1; i++) {
                        if (brand == $('input[type="radio"]').val()) {
                            let the_id = brand + entry[1]['model'][i];
                            let thumbnail = entry[1]['thumbnail'][i];
                            let stock = entry[1]['stock'][i];
                            let price = entry[1]['price'][i];

                            $('#aside-row').append('<div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 d-flex justify-content-center p-3" id="' + brand + i + '"></div>')
                            $('#' + brand + i).append('<div class="card w-100 h-100" id="' + the_id + '"></div>')
                            $('#' + the_id).append('<img class="card-img-top" src="image/' + thumb_path + '/' + thumbnail + '" alt="Card image cap"></div><div class="card-body d-flex flex-column justify-content-around"></div>')
                            $('#' + the_id).find('.card-body').append('<h5 class="card-title">' + brand + ' ' + entry[1]['model'][i] + '</h5>')
                            $('#' + the_id).find('.card-body').append(' <p class="card-text">$' + price + '</p><a href="#" class="btn btn-primary d-block">Add to cart</a>')
                        }
                    }
                })
            })
        })
    },

    slider: function(json_file, thumb_path) {
        let min = $('#min-price').text();
        let max = $('#max-price').text();
        $.get('json/' + json_file, function(data) {
            $('#aside-right').empty()
            $('#aside-right').append('<div class = "row" id="aside-row"> </div>')
            Object.entries(data).forEach(function(entry) {
                let brand = entry[0]
                for (i = 0; i < Object.keys(entry[1]).length; i++) {
                    if (Number(entry[1]['price'][i]) > Number(min) && Number(entry[1]['price'][i]) < Number(max)) {
                        if (brand == $('input[type="radio"]').val()) {
                            let the_id = brand + entry[1]['model'][i];
                            let thumbnail = entry[1]['thumbnail'][i];
                            let stock = entry[1]['stock'][i];
                            let price = entry[1]['price'][i];

                            $('#aside-row').append('<div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 d-flex justify-content-center p-3" id="' + brand + i + '"></div>')
                            $('#' + brand + i).append('<div class="card" style="width: 13rem; height:20rem;" id="' + the_id + '"></div>')
                            $('#' + the_id).append('<img class="card-img-top" src="image/' + thumb_path + '/' + thumbnail + '" alt="Card image cap"></div><div class="card-body"></div>')
                            $('#' + the_id).find('.card-body').append('<h5 class="card-title">' + brand + ' ' + entry[1]['model'][i] + '</h5>')
                            $('#' + the_id).find('.card-body').append(' <p class="card-text">$' + price + '</p><a href="#" class="btn btn-primary">Add to cart</a>')
                        }
                    }
                }
            })
        })
    },

    radio: function(json_file, thumb_path, value) {
        let min = $('#min-price').text();
        let max = $('#max-price').text();
        $.get('json/' + json_file, function(data) {
            $('#aside-right').empty()
            $('#aside-right').append('<div class = "row" id="aside-row"> </div>')
            Object.entries(data).forEach(function(entry) {
                let brand = entry[0]
                for (i = 0; i < Object.keys(entry[1]).length; i++) {
                    if (Number(entry[1]['price'][i]) > Number(min) && Number(entry[1]['price'][i]) < Number(max)) {
                        if (brand == value) {
                            let the_id = brand + entry[1]['model'][i];
                            let thumbnail = entry[1]['thumbnail'][i];
                            let stock = entry[1]['stock'][i];
                            let price = entry[1]['price'][i];

                            $('#aside-row').append('<div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 d-flex justify-content-center p-3" id="' + brand + i + '"></div>')
                            $('#' + brand + i).append('<div class="card" style="width: 13rem; height:20rem;" id="' + the_id + '"></div>')
                            $('#' + the_id).append('<img class="card-img-top" src="image/' + thumb_path + '/' + thumbnail + '" alt="Card image cap"></div><div class="card-body"></div>')
                            $('#' + the_id).find('.card-body').append('<h5 class="card-title">' + brand + ' ' + entry[1]['model'][i] + '</h5>')
                            $('#' + the_id).find('.card-body').append(' <p class="card-text">$' + price + '</p><a href="#" class="btn btn-primary">Add to cart</a>')
                        }
                    }
                }
            })
        })
    }
}

$(document).ready(function() {
    $('#laptops').click(function() {
        Get_request.normal('laptop.json', 'laptops')
    })

    $('#pcs').click(function() {
        Get_request.normal('pc.json', 'pcs')
    })

    $('#mobiles').click(function() {
        Get_request.normal('mobile.json', 'mobiles')
    })

    $('#login').click(function() {
        $.get('login.html', function(data) {
            $('main').empty()
            $('main').html(data)
        })
    })

    $('#signup').click(function() {
        $.get('signup.html', function(data) {
            $('main').empty()
            $('main').html(data)
        })
    })

    $('#price-slide').slider({
        range: true,
        min: 10,
        max: 1000,
        values: [10, 1000],
        step: 5,
        slide: function(event, ui) {
            if (ui.values[0] == ui.values[1]) {
                return false;
            }
            $('#min-price').text(ui.values[0]);
            $('#max-price').text(ui.values[1]);
            let url = window.location.href;
            if (url.includes('laptop')) {
                Get_request.slider('laptop.json', 'laptops')
            } else if (url.includes('pc')) {
                Get_request.slider('pc.json', 'pcs')
            } else {
                Get_request.slider('mobile.json', 'mobiles')
            }
        }
    })

    $('input[type="radio"]').click(function() {
        let value = $(this).val()
        let url = window.location.href;
        let min = $('#min-price').text();
        let max = $('#max-price').text();
        if (url.includes('laptop')) {
            Get_request.radio('laptop.json', 'laptops', value)
        } else if (url.includes('pc')) {
            Get_request.radio('pc.json', 'pcs', value)
        } else {
            Get_request.radio('mobile.json', 'mobiles', value)
        }
    })
})