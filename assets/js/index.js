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
        "url":`http://localhost:3000/api/tasks/${data.id}`,
        "method": "PUT",
        "data":data
    }

    $.ajax(request).done(function(response){
        alert("Data updated successfully");
    })
})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/tasks/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}