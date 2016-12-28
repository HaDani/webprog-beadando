$('#btnModifyToDo').on('click', function (e) {
    e.preventDefault()
    const $modal = $('#modifyModal')

 //   const comments = yield Comment.all();
    if ($modal.length>0) {
        $modal.modal('show')
    } else {
        const $modal = $(`
        <div class="modal fade confirm-modal" tabindex="-1" role="dialog" id="commentModal">
            <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">ToDo módosítása</div>
                <div class="modal-body">
                <div class="alert alert-danger"></div>
                <div class="form-area"></div>
                </div>
            </div>
            </div>
        </div>
        `)
        
   
        const $formContainer = $modal.find('.form-area')

        const $errorContainer = $modal.find('.alert').hide()
            const currLink = window.location.href;
            console.log(currLink);
            let currLinkArray = currLink.split('/'); 
            console.log(currLinkArray);
            const currID = currLinkArray[currLinkArray.length - 1];
                       console.log("CurrID" + currID);
     

            $formContainer.load('/todos/' + currID + '/modify form', function () {
            $modal.modal('show')
            const $form = $modal.find('form')
            $form.on('submit', function(e) {
                e.preventDefault()
                const data = $(this).serializeArray()
             

                Promise.resolve(
               
                    
                $.ajax({
                    url: '/ajax/todos/'+currID+'/modify',
                    method: 'POST',
                    data,
                    dataType: 'json',
                    headers: { 'csrf-token': $('[name="_csrf"]').val() }
                })
                )
                .then(json => {
                    if (json.success) {
                        
                        
                        
                        
                        
                        console.log(json.tCatID);

                        
                        
                        
                        
                        
                    
                        $('#todoName').text(json.tName)
                                               
                        $('#todoDesc').text(json.tDesc);
                        $('#todoCatName').text(json.tCatID);
                        $('#todoName').text(json.tName);
                    //    $('#todoDate').text(json.tYDate + ". " + json.tMDate + ". " + json.tDDate);
                        
                                           if (json.tDDate < 10 && json.tMDate < 10 && json.tYDate >= 2016) {
                        $('#todoDate').text(json.tYDate + ".0" + json.tMDate + ".0" + json.tDDate);
                   }
                   else if (json.tDDate < 10 && json.tYDate >= 2016){
                         $('#todoDate').text(json.tYDate + "." + json.tMDate + ".0" + json.tDDate);
                   }
                   else if (json.tMDate < 10 && json.tYDate >= 2016){
                         $('#todoDate').text(json.tYDate + ".0" + json.tMDate + "." + json.tDDate);
                   } 
                   else if (json.tDDate > 0 && json.tMDate > 0 && json.tYDate >= 2016){
                         $('#todoDate').text(json.tYDate + "." + json.tMDate + "." + json.tDDate);
                   } 
                   else {
                       $('#todoDate').text("");
                   }        
                        
                        
                        
                        
                        
                        $modal.modal('hide');
   
                   
                        
                    } else {
                        $errorContainer.show().text('Nem megfelelő adatok')
                    }
                })
                .catch(err => console.log(err))
            })  
        })
    }
})


//tName: todo.name, tDesc: todo.description, tCatID: todo.category_id, tYDate: todo.year_date, tMDate: todo.month_date, tDDate: todo.day_date