$('#profileBtn').on('click', function (e) {
    e.preventDefault()
    const $modal = $('#profileModal')
    
    
    Promise.resolve(
                            

                        
                    $.ajax({
                        url: '/ajax/todos/showMyToDos',
                        method: 'POST',
                   
                        dataType: 'json',
                        headers: { 'csrf-token': $('[name="_csrf"]').val() }
                    })
                    )
                    .then(json => {
                        if (json.success) {
                            console.log("D: " + json.id);
                            uid = json.id;
                        // console.log("DDD: " + sessionStorage.getItem("currUID"));
                        
                            if ($modal.length>0) {
        $modal.modal('show')
    } else {
        const $modal = $(`
        <div class="modal fade confirm-modal" tabindex="-1" role="dialog" id="commentModal">
            <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">Profil adatok</div>
                <div class="modal-body">
                <div class="alert alert-danger"></div>
                <div class="form-area"></div>
                </div>
            </div>
            </div>
        </div>
        `)
        
        var tableDiv = $('#tableBody');

        const $formContainer = $modal.find('.form-area')

        const $errorContainer = $modal.find('.alert').hide()
            const currLink = window.location.href;
            let currLinkArray = currLink.split('/'); 
            //console.log("!" + currUID);
                
            $formContainer.load('/profile/' + uid + ' form', function () {
            $modal.modal('show')
            

            const $form = $modal.find('form')
            $form.on('submit', function(e) {
                e.preventDefault()
                const data = $(this).serializeArray()
                //console.log(data);
                 let uid;
                       
             
                Promise.resolve(
               
                    
                $.ajax({
                    url: '/ajax/profile/'+ uid,
                    method: 'POST',
                    data,
                    dataType: 'json',
                    headers: { 'csrf-token': $('[name="_csrf"]').val() }
                })
                )
                .then(json => {
                    if (json.success) {
                        console.log("!!!");
                        console.log(data);
                    //$('#tableDiv').load('/todos/' + currID + ' #tableDiv', function() {
                        $modal.modal('hide')
                        //console.log("!!!");
                        
                        $('#userNameLI').text("Üdv, " + json.lName + " " + json.fName + "!");
                    } else {
                        $errorContainer.show().text('Nem megfelelő adatok')
                    }
                })
                .catch(err => console.log(err))
            })  
        })
    }
                        
                        
                            
                        } else {
                            $errorContainer.show().text('Nem megfelelő adatok')
                        }
                    })
                    .catch(err => console.log(err))     
    
 //   const comments = yield Comment.all();

})








































