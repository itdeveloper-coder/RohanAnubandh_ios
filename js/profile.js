document.addEventListener("deviceready", function () {
    console.log("✅ Device is ready!");
    /*requestStoragePermission(); // Call permission function*/
}, false);

// ✅ Function to request storage permissions
function requestStoragePermission() {
    var permissions = cordova.plugins.permissions;
    permissions.requestPermissions(
        [permissions.READ_EXTERNAL_STORAGE, permissions.WRITE_EXTERNAL_STORAGE],
        function (status) {
            if (status.hasPermission) {
                console.log("✅ Storage permissions granted!");
            } else {
                //alert("❌ Storage permissions are required for image access!");
            }
        },
        function () {
            //alert("❌ Failed to request storage permissions!");
        }
    );
}

function openCamera() {
    navigator.camera.getPicture(
        function (imageURI) {
            window.resolveLocalFileSystemURL(imageURI, function (fileEntry) {
                fileEntry.file(function (file) {
                    var reader = new FileReader();
                    reader.onloadend = function () {
                        var blob = new Blob([new Uint8Array(this.result)], { type: "image/jpeg" });

//                        var imageElement = document.getElementById("profile_img");
////                    var imageURL = fileEntry.toURL(); // Convert to proper file URL

////                    imageElement.src = imageURL;


                        uploadImage(blob, fileEntry.name);
                    };
                    reader.readAsArrayBuffer(file);
                });
            }, function (err) {
                alert("❌ File system error: " + JSON.stringify(err));
            });
        },
        function (error) {
            alert("❌ Failed to capture image: " + error);
        },
        {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            correctOrientation: true
        }
    );
}

function uploadImage(blob, fileName) {
    var formData = new FormData();
    formData.append("file", blob, fileName + "^" + localStorage.getItem("profileguid"));
    fetch("https://customerportal.rohanbuilders.com/Handler1.ashx", {
        method: "POST",
        body: formData
    })
        .then(response => response.text())
        .then(result  => {
            var strvarguid = '';
            var strvarfilname = '';
            if (result == '') {
                strvarguid = localStorage.getItem("profileguid");
                strvarfilname = localStorage.getItem("profName");
            }
            else {
                strvarguid = result.split(',')[0];
                strvarfilname = result.split(',')[1];
            }

            var eventval11 = "Event:Update_Delete_Old_Profile_Pic~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid") + "~!NewFileName:" + strvarfilname + "~!PrfGuid:" + strvarguid + "";
            var getSubmdata = "";
            var vrget22 = fnsndrequest("AppCP", eventval11);
            getSubmdata = vrget22.replace(/\[|\]/g, "");

            // Function to extract a specific key's value from the response string
            const vrstatus = getValueByKey(getSubmdata, "Status");
            const vrmsg = getValueByKey(getSubmdata, "Msg");
            const vrimgpath = getValueByKey(getSubmdata, "Imgpath");

            if (vrstatus == "Success") {
                alert("✅ " + vrmsg);
                $("#profile_img").attr("src", vrimgpath);
                localStorage.setItem("profileguid", strvarguid);
                localStorage.setItem("profName", strvarfilname);
                localStorage.setItem("cpprofilepic", vrimgpath);
            }
            else {
                alert("❌ " + vrmsg + "!");
            }
        })
        .catch(error => {
            console.error("❌ Upload error:", error);
            alert("❌ Error uploading image...." + error);
        });
}




$(document).ready(function () {
    //$(".profileediticon").click(function () {
    //    var permissions = cordova.plugins.permissions;

    //    // First, check if permissions are already granted
    //    permissions.checkPermission(permissions.READ_EXTERNAL_STORAGE, function (status) {
    //        if (status.hasPermission) {
    //            // If already granted, directly trigger the file input
    //            $("#profile_file_editicon").click();
    //            console.log("✅ Storage permissions already granted!");
    //        } else {
    //            // Request permissions if not granted
    //            permissions.requestPermissions(
    //                [permissions.READ_EXTERNAL_STORAGE, permissions.WRITE_EXTERNAL_STORAGE],
    //                function (status) {
    //                    if (status.hasPermission) {
    //                        $("#profile_file_editicon").click();
    //                        console.log("✅ Storage permissions granted!");
    //                    } else {
    //                        console.log("❌ Storage permissions denied.");
    //                        alert("❌ Storage permissions were denied. Please enable them in settings.");
    //                    }
    //                },
    //                function (error) {
    //                    console.log("❌ Failed to request storage permissions!", error);
    //                    alert("❌ Failed to request storage permissions! Error: " + JSON.stringify(error));
    //                }
    //            );
    //        }
    //    }, function (error) {
    //        console.log("❌ Failed to check storage permissions!", error);
    //        alert("❌ Failed to check storage permissions! Error: " + JSON.stringify(error));
    //    });
    //});



    $(".profileediticon").click(function () {
        var permissions = cordova.plugins.permissions;

        // Check if permission is granted
        permissions.checkPermission(permissions.READ_EXTERNAL_STORAGE, function (status) {
            if (status.hasPermission) {
                // If permission is granted, trigger file input
                $("#profile_file_editicon").click();
                console.log("✅ Storage permissions already granted!");
            } else {
                // Request permission every time until granted
                permissions.requestPermissions(
                    [permissions.READ_EXTERNAL_STORAGE, permissions.WRITE_EXTERNAL_STORAGE],
                    function (status) {
                        if (status.hasPermission) {
                            $("#profile_file_editicon").click();
                            console.log("✅ Storage permissions granted!");
                        } else {
                            console.log("❌ Storage permissions denied. Requesting again...");
                            alert("❌ You must allow storage permissions to proceed.");
                        }
                    },
                    function (error) {
                        console.log("❌ Failed to request storage permissions!", error);
                        alert("❌ Error1: " + JSON.stringify(error));
                    }
                );
            }
        }, function (error) {
            console.log("❌ Failed to check storage permissions!", error);
            alert("❌ Error: " + JSON.stringify(error));
        });
    });







    $("#profile_file_editicon").change(function (event) {
        if (event.target.files.length > 0) {
            var file = event.target.files[0];
            if (file.size <= 10240) { // 10KB = 10240 bytes
                uploadImage2(file);
            } else {
                alert("❌ File size must be 10KB or less.");
            }
        }
    });
});



function uploadImage2(file) {
    var formData = new FormData();
    formData.append("file", file);
    formData.append("profileguid", localStorage.getItem("profileguid"));

    fetch("https://customerportal.rohanbuilders.com/Handler1.ashx", {
        method: "POST",
        body: formData
    })
        .then(response => response.text())
        .then(result => {
            if (!result) {
                alert("❌ No response from server");
                return;
            }

            var [strvarguid, strvarfilname] = result.split(",");
            if (!strvarguid || !strvarfilname) {
                strvarguid = localStorage.getItem("profileguid");
                strvarfilname = localStorage.getItem("profName");
            }

            var eventval11 = `Event:Update_Delete_Old_Profile_Pic~!cpuserid:${localStorage.getItem("cpuserid")}~!cpsaleid:${localStorage.getItem("cpsaleid")}~!cploginid:${localStorage.getItem("cploginid")}~!NewFileName:${strvarfilname}~!PrfGuid:${strvarguid}`;
            var getSubmdata = fnsndrequest("AppCP", eventval11).replace(/\[|\]/g, "");

            const vrstatus = getValueByKey(getSubmdata, "Status");
            const vrmsg = getValueByKey(getSubmdata, "Msg");
            const vrimgpath = getValueByKey(getSubmdata, "Imgpath");

            if (vrstatus === "Success") {
                alert("✅ " + vrmsg);
                $(".profile_img").attr("src", vrimgpath);
                localStorage.setItem("profileguid", strvarguid);
                localStorage.setItem("profName", strvarfilname);
                localStorage.setItem("cpprofilepic", vrimgpath);
            } else {
                alert("❌ " + vrmsg + "!");
            }
        })
        .catch(error => {
            console.error("❌ Upload error:", error);
            alert("❌ Error uploading image: " + error.message);
        });
}


$('#btn_downloadDraft').on('click', async function () {
    alert("Drafting your agreement. Hang tight..");
    var eventval11 = `Event:Download_Agreement_Draft~!cpuserid:${localStorage.getItem("cpuserid")}~!cpsaleid:${localStorage.getItem("cpsaleid")}~!cploginid:${localStorage.getItem("cploginid")}`;
    var getSubmdata = await fnsndrequest("AppCP", eventval11).replace(/\[|\]/g, "");

    ///alert(getSubmdata);
    var fileUrl = "https://customerportal.rohanbuilders.com/Template/Agreement_Draft.docx";
    
    fetch(fileUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network error while downloading file.");
            }
            return response.arrayBuffer();
        })
        .then(content => {
            const zip = new PizZip(content);
            //const doc = new window.docxtemplater().loadZip(zip);

            const doc = new window.docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
                delimiters: {
                    start: '<<<',
                    end: '>>>'
                }
            });


            //doc.setData({
            //    CUSTOMERNAME: "Chandrashekhar",
            //    OCCUPATION: "TL",
            //    CUSTOMERADDRESS: "Rohan Anubandh"
            //});

            doc.setData(JSON.parse(getSubmdata));

            try {
                doc.render();
            } catch (error) {
                console.error("Template rendering error: ", error);
                alert("Error rendering Word template.");
                return;
            }

            const out = doc.getZip().generate({
                type: "blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });

            // Save and open file using Cordova
            window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (dirEntry) {
                let ltfilenamse = "Agreement_Draft.docx";
                dirEntry.getFile(ltfilenamse, { create: true, exclusive: false }, function (fileEntry) {
                    fileEntry.createWriter(function (fileWriter) {
                        fileWriter.write(out);
                        fileWriter.onwriteend = function () {
                            cordova.plugins.fileOpener2.open(
                                fileEntry.nativeURL,
                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                {
                                    error: function (e) {
                                        console.log("Error opening file: " + JSON.stringify(e));
                                        alert("Saved, but couldn't open file.");
                                    },
                                    success: function () {
                                        console.log("File opened successfully.");
                                    }
                                }
                            );
                        };
                    }, err => alert("File write error: " + JSON.stringify(err)));
                }, err => alert("File create error: " + JSON.stringify(err)));
            }, err => alert("Directory access error: " + JSON.stringify(err)));
        })
        .catch(err => {
            console.error("Fetch error:", err);
            alert("Could not download template: " + err.message);
        });
});



//$('#btn_downloadDraft').on('click', function () {
//    // 1. Call your server to get dynamic data
//    $.ajax({
//        url: 'https://yourapi.com/api/GetUserAgreementData?id=31381', // ← replace with your real API
//        method: 'GET',
//        dataType: 'json',
//        success: function (responseData) {
//            console.log('Fetched dynamic data:', responseData);

//            // 2. Now fetch the Word template
//            fetch("https://customerportal.rohanbuilders.com/Template/Agreement_Draft.docx")
//                .then(res => {
//                    if (!res.ok) throw new Error("Failed to fetch DOCX template");
//                    return res.arrayBuffer();
//                })
//                .then(content => {
//                    const zip = new PizZip(content);
//                    const doc = new window.docxtemplater().loadZip(zip);

//                    // 3. Inject dynamic data
//                    doc.setData(responseData);

//                    try {
//                        doc.render();
//                    } catch (error) {
//                        console.error("Template render error", error);
//                        alert("Error processing Word template");
//                        return;
//                    }

//                    const out = doc.getZip().generate({
//                        type: "blob",
//                        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//                    });

//                    // 4. Save and open file in Cordova
//                    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (dirEntry) {
//                        dirEntry.getFile("Agreement_Updated.docx", { create: true, exclusive: false }, function (fileEntry) {
//                            fileEntry.createWriter(function (fileWriter) {
//                                fileWriter.write(out);
//                                fileWriter.onwriteend = function () {
//                                    cordova.plugins.fileOpener2.open(
//                                        fileEntry.nativeURL,
//                                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//                                        {
//                                            success: () => console.log("File opened"),
//                                            error: (e) => alert("File saved but couldn't open")
//                                        }
//                                    );
//                                };
//                            });
//                        });
//                    });
//                })
//                .catch(err => {
//                    console.error("DOCX template fetch error:", err);
//                    alert("Error downloading template");
//                });
//        },
//        error: function (err) {
//            console.error("API fetch error:", err);
//            alert("Could not fetch user data from server.");
//        }
//    });
//});

