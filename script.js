window.addEventListener("DOMContentLoaded", () => {

    const sr_button = document.getElementById("sr_button");
    const microphone_status = document.getElementById("microphone_status");
    const well_list_div = document.getElementById("well_list_div");
    const sr_error = document.getElementById("sr_error");
    const sr_confidence = document.getElementById("sr_confidence");
    const sr_result = document.getElementById("sr_result");
    const manage_well_info = document.getElementById("manage_well_info");
    const grid_well_descr = document.getElementById("grid_well_descr");
    const well_eq_descr = document.getElementById("well_eq_descr");
    const well_info_descr = document.getElementById("well_info_descr");

    class Equipment {
        constructor(EquipType, Weight, Amount) {
            this.EquipType = EquipType;
            this.Weight = Weight;
            this.Amount = Amount;
        }
    }

    class Well {
        constructor(Id) {
            this.Id = Id;
            this.Note = ""
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

        randomItem(buffer) {
            var number = Math.floor(Math.random() * buffer.length);
            return number;
        }

        Init() {

            var equip_list = [
                'насос',
                'нкт',
                'хвостовик',
                'штанг'
            ];

            this.well_list = [];
            this.well_list.push(new Well(100));
            this.well_list.push(new Well(101));
            this.well_list.push(new Well(102));

            for (var i = 0; i < this.well_list.length; i++) {
                this.well_list[i].EquipmentList = new Array();
                this.well_list[i].EquipmentList = new Array();
                this.well_list[i].EquipmentList.push(new Equipment(equip_list[this.randomItem(equip_list)], (Math.random() * 100).toFixed(1), Math.ceil(Math.random() * 10)));
                this.well_list[i].EquipmentList.push(new Equipment(equip_list[this.randomItem(equip_list)], (Math.random() * 100).toFixed(1), Math.ceil(Math.random() * 10)));
                this.well_list[i].EquipmentList.push(new Equipment(equip_list[this.randomItem(equip_list)], (Math.random() * 100).toFixed(1), Math.ceil(Math.random() * 10)));
            }

            this.GenerateWellList();

            this.SetActiveWellId(this.well_list[0].Id);
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
                grid_well_descr.style.visibility = 'hidden'
                return;
            }

            grid_well_descr.style.visibility = 'visible'
            well_eq_descr.innerHTML = 'Список оборудований со скважины ' + well_Id;
            well_info_descr.innerHTML = 'Информация о скважине ' + well_Id;

            let listElement = document.createElement('tr'),
                numberOfListItems = well[0].EquipmentList == null ? 0 : well[0].EquipmentList.length,
                listItem,
                i;

            listItem = document.createElement('th');
            listItem.innerHTML = "Номер";
            listElement.appendChild(listItem);

            listItem = document.createElement('th');
            listItem.innerHTML = "Наименование";
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
					this.SetActiveEquipment(this.Selected_EquipmNo);
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
        constructor() {
            this.LongSpeechMode = false;

            this.SpeechAPI_Init();

        }

        SpeechAPI_Init() {

            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

const stop = () => {
                    listening = false;
                    sr_button.classList.remove("selected");
                    this.recognition.stop();
                    microphone_status.innerHTML = "Микрофон отключен. Чтобы включить, нажмите кнопку &LongRightArrow;";
                };

                const start = () => {
                    listening = true;
                    sr_button.classList.add("selected");
                    this.recognition.start();
                    microphone_status.innerHTML = "Микрофон включен. Чтобы выключить, нажмите кнопку &LongRightArrow;";
                };
				
            const commands = {
                "добавить скважину номер": skw_id => {
                    if (skw_id != null) well_manager.AddWell(parseInt(skw_id, 10))
                },
                "выбрать скважину номер": skw_id => {
                    if (skw_id != null) well_manager.SetActiveWellId(parseInt(skw_id, 10))
                },
                "удалить скважину номер": skw_id => {
                    if (skw_id != null) well_manager.RemoveWell(parseInt(skw_id, 10))
                },
                "добавить оборудование": equip_type => {
                    if (equip_type != null) well_manager.AddEquip(equip_type, 0, 0)
                },
                "выбрать оборудование номер": equip_no => {
                    if (equip_no != null) well_manager.SetActiveEquipment(parseInt(equip_no, 10))
                },
                "удалить оборудование номер": equip_no => {
                    if (equip_no != null) well_manager.RemoveEquip(parseInt(equip_no, 10))
                },
                "изменить наименование на": equip_type => {
                    if (equip_type != null) well_manager.Change_EquipType(equip_type)
                },
                "изменить вес на": weight => {
                    if (weight != null) well_manager.Change_Weight(parseFloat(weight.replace(' ', '').replace(',', '.')))
                },
                "изменить количество на": quantity => {
                    if (quantity != null) well_manager.Change_Quantity(parseInt(quantity, 10))
                },
                "редактировать": () => {
                    this.LongSpeechMode = true;
                    manage_well_info.classList.add("selected");
                },
                "очистить редактор": () => {
                    if (this.LongSpeechMode) well_manager.ClearInfo();
                },
                "завершить редактировать": () => {
                    this.LongSpeechMode = false;
                    manage_well_info.classList.remove("selected");
                    well_manager.GenerateWellInfo();
                },
				"выключить микрофон": () => {
                    stop();
                },
            };

            const reset_cmd = () => {
                if (listening) {
                    this.recognition.abort();
                    this.recognition.start();
                }
            }


            if (typeof SpeechRecognition !== "undefined") {

                this.actions = ['добавить', 'выбрать', 'удалить', 'изменить', 'редактировать', 'очистить', 'завершить', 'выключить'];
                this.objects = ['скважину', 'оборудование', 'наименование на', 'вес на', 'количество на', 'информацию', 'редактировать', 'микрофон'];
                this.grammar = '#JSGF V1.0; grammar well_manager; <action> = ' + this.actions.join(' | ') + ' ; <object> = ' + this.objects.join(' | ') + ' ; public <query> = <action> <object>;'
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
                    const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();

                    var cmd_detected = false;

                    if (event.results[event.results.length - 1].isFinal) {

                        for (let command in commands) {

                            if (transcript.indexOf(command) === 0) {

                                cmd_detected = true;

                                if (transcript[command.length] === undefined) {
                                    // Команда без параметров
                                    commands[command]();
                                } else {
                                    const param = transcript.substring(command.length, transcript.length).trim();
                                    commands[command](param);
                                }
                            }
                        }

                        sr_result.innerHTML = transcript;
                        sr_result.classList.add("final");

                        sr_confidence.innerHTML = (event.results[event.results.length - 1][0].confidence * 100).toFixed(2) + "%";

                        sr_error.innerHTML = "Нет ошибок";
                        sr_error.classList.remove("error");

                        if (event.results[event.results.length - 1][0].confidence > 0.80) {
                            sr_confidence.classList.add("conf_ok");
                            sr_confidence.classList.remove("conf_normal");
                            sr_confidence.classList.remove("conf_bad");
                        } else if (event.results[event.results.length - 1][0].confidence > 0.65) {
                            sr_confidence.classList.remove("conf_ok");
                            sr_confidence.classList.add("conf_normal");
                            sr_confidence.classList.remove("conf_bad");
                        } else {
                            sr_confidence.classList.remove("conf_ok");
                            sr_confidence.classList.remove("conf_normal");
                            sr_confidence.classList.add("conf_bad");
                        }

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


                    if (this.LongSpeechMode) {

                        if (event.results[event.results.length - 1].isFinal & cmd_detected == false)
                            well_manager.AddInfo(event.results[event.results.length - 1][0].transcript);

                        // Add final speech results
                        manage_well_info.innerHTML = well_manager.GetInfo();

                        for (const res of event.results) {

                            if (res.isFinal == false) {
                                const text = document.createTextNode(res[0].transcript);
                                const s = document.createElement("span");
                                s.appendChild(text);
                                manage_well_info.appendChild(s);
                            }

                        }
                    }
                };

                this.recognition.addEventListener("result", onResult);

                this.recognition.onspeechend = function() {
                    console.log('SpeechRecognition.onspeechend');
                }

                this.recognition.onerror = function(event) {
                    console.log('SpeechRecognition.onerror ' + event.error);
                    sr_error.innerHTML = event.error;
                    sr_error.classList.add("error");
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

                sr_button.addEventListener("click", event => {
                    listening ? stop() : start();
                });



            } else {
                sr_button.remove();
                microphone_status.innerHTML = "Ваш браузер не поддерживает распознавание речи.";
            }

        }
    }

    let listening = false;
    let well_manager = new WellManager();
    let speech_manager = new SpeechRecogManager();

});