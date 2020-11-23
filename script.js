window.addEventListener("DOMContentLoaded", () => {

    const sr_button = document.getElementById("sr_button");
    const microphone_status = document.getElementById("microphone_status");
    const init_button = document.getElementById("init_button");
    const well_list_div = document.getElementById("well_list_div");
    const sr_result = document.getElementById("sr_result");

    const add_well_button = document.getElementById("add_well_button");
    const remove_well_button = document.getElementById("remove_well_button");
    const manage_well_id = document.getElementById("manage_well_id");

    const add_equip_button = document.getElementById("add_equip_button");
    const remove_equip_button = document.getElementById("remove_equip_button");
    const manage_equip_no = document.getElementById("manage_equip_no");
    const manage_equip_type = document.getElementById("manage_equip_type");
    const manage_equip_weight = document.getElementById("manage_equip_weight");
    const manage_equip_amount = document.getElementById("manage_equip_amount");
    const manage_well_info = document.getElementById("manage_well_info");


    class Equipment {
        constructor(EquipType, Weight, Amount) {
            this.EquipType = EquipType;
            this.Weight = Weight;
            this.Amount = Amount;
        }
        display() {
            console.log(this.EquipType, this.Weight, this.Amount);
        }
    }

    class Well {
        constructor(Id) {
            this.Id = Id;
            this.Note = ""
        }
        display() {
            console.log(EquipType, this.Weight, this.Amount);
        }
    }

    class WellManager {
        constructor() {
            this.well_list = new Array();
            this.Selected_Well_Id = 0;
            this.Selected_EquipmNo = 0;
            this.Command = 0;

            this.Init();
        }

        SetActiveWellId(well_Id) {
            this.Selected_Well_Id = well_Id;
            this.GenerateEquipmentList(well_Id);
            this.GenerateWellInfo();
            this.SelectActiveWell();
            this.SelectActiveEquipment();
        }

        AddWell(well_id) {
            this.well_list.push(new Well(well_id));
            this.GenerateWellList();
            this.SetActiveWellId(well_id);
        }

        SetActiveEquipment(equipm_no) {
            this.Selected_EquipmNo = equipm_no;
            this.SelectActiveEquipment(equipm_no);
            this.SelectActiveEquipment();
        }

        Init() {

            this.well_list = [];
            this.well_list.push(new Well(1));
            this.well_list.push(new Well(2));
            this.well_list.push(new Well(3));

            for (var i = 0; i < this.well_list.length; i++) {
                this.well_list[i].EquipmentList = new Array();
                this.well_list[i].EquipmentList = new Array();
                this.well_list[i].EquipmentList.push(new Equipment("НКТ", (i + 1) * 100, (i + 1) * 1));
                this.well_list[i].EquipmentList.push(new Equipment("НКТ", (i + 1) * 200, (i + 1) * 2));
                this.well_list[i].EquipmentList.push(new Equipment("НКТ", (i + 1) * 300, (i + 1) * 3));
                console.log(this.well_list[i].Id);
                for (var k = 0; k < this.well_list[i].EquipmentList.length; k++)
                    this.well_list[i].EquipmentList[k].display();
                console.log(this.well_list[i].Note);
            }

            this.GenerateWellList();

            this.SetActiveWellId(this.well_list[1].Id);
        }

        GenerateWellList() {

            let listElement = document.createElement('tr'),
                numberOfListItems = this.well_list.length,
                listItem,
                i;

            // Oreder by Id
            this.well_list.sort((a, b) => a.Id < b.Id ? -1 : 1)

            listItem = document.createElement('th');
            listItem.innerHTML = "Идентификатор скважины";
            listElement.appendChild(listItem);

            well_table.innerHTML = ''; // remove all child elements
            well_table.appendChild(listElement);

            for (i = 0; i < numberOfListItems; ++i) {
                listElement = document.createElement('tr');
                listItem = document.createElement('td');
                listItem.innerHTML = this.well_list[i].Id;
                listElement.appendChild(listItem);
                well_table.appendChild(listElement);
            }

        }

        GenerateEquipmentList(well_Id) {

            var well = this.well_list.filter(well => well.Id == well_Id);

            if (well.length == 0) {
                equip_table.innerHTML = 'No data';
                return;
            }

            let listElement = document.createElement('tr'),
                numberOfListItems = well[0].EquipmentList == null ? 0 : well[0].EquipmentList.length,
                listItem,
                i;

            listItem = document.createElement('th');
            listItem.innerHTML = "Номер";
            listElement.appendChild(listItem);

            listItem = document.createElement('th');
            listItem.innerHTML = "Тип оборудования";
            listElement.appendChild(listItem);

            listItem = document.createElement('th');
            listItem.innerHTML = "Вес";
            listElement.appendChild(listItem);

            listItem = document.createElement('th');
            listItem.innerHTML = "Количество";
            listElement.appendChild(listItem);

            equip_table.innerHTML = ''; // remove all child elements
            equip_table.appendChild(listElement);

            for (i = 0; i < numberOfListItems; ++i) {
                listElement = document.createElement('tr');

                listItem = document.createElement('td');
                listItem.innerHTML = i + 1;
                listElement.appendChild(listItem);

                listItem = document.createElement('td');
                listItem.innerHTML = well[0].EquipmentList[i].EquipType;
                listElement.appendChild(listItem);

                listItem = document.createElement('td');
                listItem.innerHTML = well[0].EquipmentList[i].Weight;
                listElement.appendChild(listItem);

                listItem = document.createElement('td');
                listItem.innerHTML = well[0].EquipmentList[i].Amount;
                listElement.appendChild(listItem);

                equip_table.appendChild(listElement);
            }

        }

        GenerateWellInfo() {
            manage_well_info.innerHTML = this.GetInfo();
        }


        SelectActiveWell() {

            let table_rows = document.getElementById("well_table").getElementsByTagName("tr");

            for (var i = 1; i < table_rows.length; i++) {
                const parsed_int = parseInt(table_rows[i].cells[0].innerHTML, 10);

                if (isNaN(parsed_int) == false && this.Selected_Well_Id == parsed_int)
                    table_rows[i].classList.add("selected");
                else
                    table_rows[i].classList.remove("selected");
            }
        }

        SelectActiveEquipment() {

            let table_rows = document.getElementById("equip_table").getElementsByTagName("tr");

            for (var i = 1; i < table_rows.length; i++) {
                const parsed_int = parseInt(table_rows[i].cells[0].innerHTML, 10);

                if (isNaN(parsed_int) == false && this.Selected_EquipmNo == parsed_int)
                    table_rows[i].classList.add("selected");
                else
                    table_rows[i].classList.remove("selected");
            }
        }

        AddWell(well_id) {

            if (this.well_list.some(well => well.Id === well_id) == false) {
                this.well_list.push(new Well(well_id));
                this.GenerateWellList();
            }

            this.SetActiveWellId(well_id);
        }

        RemoveWell(well_id) {

            if (this.well_list.some(well => well.Id === well_id) == true) {
                this.well_list = this.RemoveItem(this.well_list, well_id);
                this.Selected_Well_Id = 0;
                this.GenerateWellList();
            }
        }

        RemoveItem(SrcArray, Item) {

            var index = SrcArray.findIndex(well => well.Id === Item);

            if (index > -1) {
                SrcArray.splice(index, 1); // Delete 1 element begining from index
            }

            return SrcArray;
        }

        AddEquip(equipType, weight, amount) {

            var index = this.well_list.findIndex(well => well.Id === this.Selected_Well_Id);

            if (index > -1) {

                if (this.well_list[index].EquipmentList == null)
                    this.well_list[index].EquipmentList = new Array();

                this.well_list[index].EquipmentList.push(new Equipment(equipType, weight, amount));

                this.GenerateEquipmentList(this.Selected_Well_Id);

                this.Selected_EquipmNo = this.well_list[index].EquipmentList.length;
                this.SetActiveEquipment(this.Selected_EquipmNo);
            }
        }

        Change_EquipType(equipType) {

            var well_index = this.well_list.findIndex(well => well.Id === this.Selected_Well_Id);

            if (well_index > -1) {
                if (this.Selected_EquipmNo > 0 & this.Selected_EquipmNo <= this.well_list[well_index].EquipmentList.length) {
                    this.well_list[well_index].EquipmentList[this.Selected_EquipmNo - 1].EquipType = equipType;
                    this.GenerateEquipmentList(this.Selected_Well_Id);
                    this.SetActiveEquipment(this.Selected_EquipmNo);
                }
            }
        }

        Change_Weight(weight) {

            var well_index = this.well_list.findIndex(well => well.Id === this.Selected_Well_Id);

            if (well_index > -1) {

                if (this.Selected_EquipmNo > 0 & this.Selected_EquipmNo <= this.well_list[well_index].EquipmentList.length) {
                    this.well_list[well_index].EquipmentList[this.Selected_EquipmNo - 1].Weight = weight;
                    this.GenerateEquipmentList(this.Selected_Well_Id);
                    this.SetActiveEquipment(this.Selected_EquipmNo);
                }
            }
        }

        Change_Quantity(quantity) {

            var well_index = this.well_list.findIndex(well => well.Id === this.Selected_Well_Id);

            if (well_index > -1) {
                if (this.Selected_EquipmNo > 0 & this.Selected_EquipmNo <= this.well_list[well_index].EquipmentList.length) {
                    this.well_list[well_index].EquipmentList[this.Selected_EquipmNo - 1].Amount = quantity;
                    this.GenerateEquipmentList(this.Selected_Well_Id);
                    this.SetActiveEquipment(this.Selected_EquipmNo);
                }
            }
        }


        RemoveEquip(equip_no) {

            var index = well_manager.well_list.findIndex(well => well.Id === well_manager.Selected_Well_Id);

            if (index > -1 & equip_no > 0) {
                if ((this.well_list[index].EquipmentList == null ? 0 : this.well_list[index].EquipmentList.length) >= equip_no) {
                    this.well_list[index].EquipmentList.splice((equip_no - 1), 1); // Delete 1 element begining from index

                    this.GenerateEquipmentList(this.Selected_Well_Id);
                }
            }
        }

        AddInfo(info) {
            var well_index = this.well_list.findIndex(well => well.Id === this.Selected_Well_Id);

            if (well_index > -1) {
                this.well_list[well_index].Note += info;
            }

        }

        GetInfo() {
            var well_index = this.well_list.findIndex(well => well.Id === this.Selected_Well_Id);

            if (well_index > -1) {
                return this.well_list[well_index].Note;
            } else return "";
        }

        ClearInfo() {
            var well_index = this.well_list.findIndex(well => well.Id === this.Selected_Well_Id);

            if (well_index > -1) {
                this.well_list[well_index].Note = "";
                manage_well_info.innerHTML = "";
            }
        }

    }

    class SpeechRecogManager {
        constructor(well_manager, speech_recog_button, microphone_status) {
            this.well_manager = well_manager;
            this.speech_recog_button = speech_recog_button;
            this.microphone_status = microphone_status;
            this.listening = false;
            this.LongSpeechMode = false;

            this.SpeechAPI_Init();

        }

        navigateTo(destination) {

        }


        SpeechAPI_Init() {

            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

            const commands = {
                "добавить скважину": skw_id => { if (skw_id != null) this.well_manager.AddWell(parseInt(skw_id, 10))},
                "выбрать скважину": skw_id => { if (skw_id != null) this.well_manager.SetActiveWellId(parseInt(skw_id, 10))},
                "удалить скважину": skw_id => { if (skw_id != null) this.well_manager.RemoveWell(parseInt(skw_id, 10))},
                "добавить оборудование": equip_type => { if (equip_type != null) this.well_manager.AddEquip(equip_type, 0, 0)},
                "выбрать оборудование": equip_no => { if (equip_no != null) this.well_manager.SetActiveEquipment(parseInt(equip_no, 10))},
                "удалить оборудование": equip_no => { if (equip_no != null) this.well_manager.RemoveEquip(parseInt(equip_no, 10))},
                "тип оборудования": equip_type => { if (equip_type != null) this.well_manager.Change_EquipType(equip_type)},
                "вес оборудования": weight => { if (weight != null) this.well_manager.Change_Weight(parseFloat(weight.replace(' ', '').replace(',', '.')))},
                "количество оборудования": quantity => { if (quantity != null) this.well_manager.Change_Quantity(parseInt(quantity, 10))},
                "добавить информацию": () => {
                    this.LongSpeechMode = true;
                    this.recognition.interimResults = true;
                    manage_well_info.classList.add("selected");
                },
                "очистить информацию": () => {
                    if (this.LongSpeechMode) this.well_manager.ClearInfo();
                },
                "завершить ввод информации": () => {
                    this.LongSpeechMode = false;
                    this.recognition.interimResults = true;
                    manage_well_info.classList.remove("selected");
                    this.well_manager.GenerateWellInfo();
                },
                "go to": destination => navigateTo(destination)
            };

            const reset_cmd = () => {
				if(this.listening){
					this.recognition.abort();
					this.recognition.start();
				}
			}


            if (typeof SpeechRecognition !== "undefined") {

                this.colors = ['белый', 'красный', 'зеленый', 'синий', 'черный', 'коричневый'];
                this.grammar = '#JSGF V1.0; grammar colors; public <color> = ' + this.colors.join(' | ') + ' ;'
                this.recognition = new SpeechRecognition();
                this.speechRecognitionList = new SpeechGrammarList();
                this.speechRecognitionList.addFromString(this.grammar, 1);
                this.recognition.grammars = this.speechRecognitionList;
                this.recognition.lang = 'ru';
                this.recognition.continuous = true;
                this.recognition.interimResults = true;
                this.recognition.maxAlternatives = 1;

                const onResult = event => {

                    if (typeof event.results === "undefined") return;
                    const transcript = event.results[event.results.length - 1][0].transcript
                        .toLowerCase()
                        .trim();

                    var cmd_detected = false;




                    if (event.results[event.results.length - 1].isFinal) {
                        sr_result.innerHTML = "";
                        const text = document.createTextNode(transcript);
                        const s = document.createElement("span");
                        s.appendChild(text);
                        s.classList.add("final");
                        sr_result.appendChild(s);

                    } else {

                        sr_result.innerHTML = "";

                        for (const res of event.results) {
                            if (res.isFinal == false) {
                                const text = document.createTextNode(res[0].transcript);
                                const s = document.createElement("span");
                                s.appendChild(text);
                                sr_result.appendChild(s);
                            }
                        }

                    }

                    if (event.results[event.results.length - 1].isFinal) {

                        for (let command in commands) {

                            if (transcript.indexOf(command) === 0) {

                                cmd_detected = true;

                                if (transcript[command.length] === undefined) {
                                    // Команда без параметров
                                    commands[command]();
                                } else {
                                    const param = transcript
                                        .substring(command.length, transcript.length)
                                        .trim();
                                    commands[command](param);
                                }
                            }
                        }
                    }

                    if (this.LongSpeechMode) {

                        manage_well_info.innerHTML = "";

                        if (event.results[event.results.length - 1].isFinal & cmd_detected == false)
                            this.well_manager.AddInfo(event.results[event.results.length - 1][0].transcript);

                        // Add final speech results
                        const text = document.createTextNode(this.well_manager.GetInfo());
                        const s = document.createElement("span");
                        s.classList.add("final");
                        s.appendChild(text);
                        manage_well_info.appendChild(s);


                        for (const res of event.results) {

                            if (res.isFinal == false) {
                                const text = document.createTextNode(res[0].transcript);
                                const s = document.createElement("span");
                                s.appendChild(text);
                                manage_well_info.appendChild(s);
                            }

                        }
                    }

                    /*
                    sr_result.innerHTML = "";
                    for (const res of event.results) {
                        const text = document.createTextNode(res[0].transcript);
                        const p = document.createElement("p");
                        if (res.isFinal) {
                            p.classList.add("final");
							console.log('Confidence: ' + res[0].confidence);
                        }
                        p.appendChild(text);
                        sr_result.appendChild(p);
                    }*/
                };

                this.recognition.addEventListener("result", onResult);

                this.recognition.onspeechend = function() {
                    console.log('SpeechRecognition.onspeechend');
                }

                this.recognition.onerror = function(event) {
                    console.log('SpeechRecognition.onerror ' + event.error);
					microphone_status.innerHTML = event.error;
                }

                this.recognition.onaudiostart = function(event) {
                    //Fired when the user agent has started to capture audio.
                    console.log('SpeechRecognition.onaudiostart');
                }

                this.recognition.onaudioend = function(event) {
                    //Fired when the user agent has finished capturing audio.
                    console.log('SpeechRecognition.onaudioend');
                }



                this.recognition.onend = function(event) {
                    //Fired when the speech recognition service has disconnected.
                    console.log('SpeechRecognition.onend');
                    reset_cmd();
                }

                this.recognition.onnomatch = function(event) {
                    //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
                    console.log('SpeechRecognition.onnomatch');
                }

                this.recognition.onsoundstart = function(event) {
                    //Fired when any sound — recognisable speech or not — has been detected.
                    console.log('SpeechRecognition.onsoundstart');
                }

                this.recognition.onsoundend = function(event) {
                    //Fired when any sound — recognisable speech or not — has stopped being detected.
                    console.log('SpeechRecognition.onsoundend');
                }

                this.recognition.onspeechstart = function(event) {
                    //Fired when sound that is recognised by the speech recognition service as speech has been detected.
                    console.log('SpeechRecognition.onspeechstart');
                }
                this.recognition.onstart = function(event) {
                    //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
                    console.log('SpeechRecognition.onstart');
                }


                const stop = () => {
                    this.listening = false;
                    this.speech_recog_button.classList.remove("selected");
                    this.recognition.stop();
                    this.microphone_status.innerHTML = "Микрофон отключен. Чтобы включить, нажмите кнопку &LongRightArrow;";
                    //sr_button.textContent = "Start listening";
                };

                const start = () => {
                    this.listening = true;
                    this.speech_recog_button.classList.add("selected");
                    this.recognition.start();
                    this.microphone_status.innerHTML = "Микрофон включен. Чтобы выключить, нажмите кнопку &LongRightArrow;";
                    //this.speech_recog_button.textContent = "Stop listening";
                };

                this.speech_recog_button.addEventListener("click", event => {
                    this.listening ? stop() : start();
                });



            } else {
                this.speech_recog_button.remove();
                this.microphone_status.innerHTML = "Ваш браузер не поддерживает распознавание речи.";
            }

        }
    }

    function Well_Reset() {
        well_manager.Init();
    }

    function AddWell_Manually() {
        let well_id = document.getElementById("manage_well_id");
        const parsed_int = parseInt(well_id.value);

        if (isNaN(parsed_int) == false)
            well_manager.AddWell(parsed_int);
    }

    function RemoveWell_Manually() {
        let well_id = document.getElementById("manage_well_id");
        const parsed_int = parseInt(well_id.value);

        if (isNaN(parsed_int) == false)
            well_manager.RemoveWell(parsed_int);
    }

    function AddEquip_Manually() {

        let equip_type = document.getElementById("manage_equip_type");

        let equip_weight = document.getElementById("manage_equip_weight");
        const parsed_equip_weight = parseInt(equip_weight.value);

        let equip_amount = document.getElementById("manage_equip_amount");
        const parsed_equip_amount = parseInt(equip_amount.value);

        well_manager.AddEquip(equip_type.value, parsed_equip_weight, parsed_equip_amount);
    }

    function RemoveEquip_Manually() {

        let equip_no = document.getElementById("manage_equip_no");
        const parsed_equip_no = parseInt(equip_no.value);

        if (isNaN(parsed_equip_no) == false)
            well_manager.RemoveEquip(parsed_equip_no);
    }

    let well_manager = new WellManager();
    let speech_manager = new SpeechRecogManager(well_manager, sr_button, microphone_status);

    init_button.addEventListener("click", Well_Reset);
    add_well_button.addEventListener("click", AddWell_Manually);
    remove_well_button.addEventListener("click", RemoveWell_Manually);
    add_equip_button.addEventListener("click", AddEquip_Manually);
    remove_equip_button.addEventListener("click", RemoveEquip_Manually);

});