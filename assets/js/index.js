$("#add_task").submit(function(event){
    alert("Data inserted successfully");
})

$("#edit_task").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']]=n['value']
    })
    
    // console.log(unindexed_array)
    var request = {
        "url":`http://localhost:3000/api/tasks/${data.taskID}`,
        "method": "PUT",
        "data":data
    }

    $.ajax(request).done(function(response){
        alert("Data updated successfully");
    })
})