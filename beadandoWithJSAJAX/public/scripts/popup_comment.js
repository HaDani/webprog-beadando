$('#btnComment').on('click', function (e) {
    e.preventDefault()
    const $modal = $('#commentModal')
    
 //   const comments = yield Comment.all();
    if ($modal.length>0) {
        $modal.modal('show')
    } else {
        const $modal = $(`
        <div class="modal fade confirm-modal" tabindex="-1" role="dialog" id="commentModal">
            <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">Megjegyzés írása</div>
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
            console.log(currLink);
            let currLinkArray = currLink.split('/'); 
            console.log(currLinkArray);
            const currID = currLinkArray[currLinkArray.length - 1];

            $formContainer.load('/todos/' + currID + '/comment form', function () {
            $modal.modal('show')
            const $form = $modal.find('form')
            $form.on('submit', function(e) {
                e.preventDefault()
                const data = $(this).serializeArray()
                console.log(data);

                Promise.resolve(
               
                    
                $.ajax({
                    url: '/ajax/todos/'+currID+'/comment',
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
                        
                        tableDiv.append(`<tr>
                            <td style="width:10%">
                                Saját
                            </td>
                            <td>
                               `+ data[1].value +`
                            </td>
                            <td>
                                Saját
                            </td>
                            
                                                                                `);
                    } else {
                        $errorContainer.show().text('Nem megfelelő adatok')
                    }
                })
                .catch(err => console.log(err))
            })  
        })
    }
})
