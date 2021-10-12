module.exports = {
  validateIp(ip) {
    const testIp = new RegExp(/^(([1-9]?\d|1\d\d|2[0-5][0-5]|2[0-4]\d).){3}([1-9]?\d|1\d\d|2[0-5][0-5]|2[0-4]\d)$/);
    return testIp.test(ip);
  },
  //-------------------------------------Emptyness--------------------------------------//
  IsEmpty(D) {
    if (typeof D == 'string' && (D === '{}' || D === '[]')) {
      return true;
    } else if (typeof D == 'object' && this.Wasper(D) === '[' || D.length) {
      return true;
    } else if (typeof D == 'object' && this.Wasper(D) === '{' || Object.keys(D).length) {
      return true;
    } else {
      return false
    }
  },

  //-------------------------------------Check If Number--------------------------------//
  IsNum(Num) {
    try {
      if (this.Exists(Num)) {
        Num = Num.toString().split(' ').join('');
        Num = Num.toString().split('+').join('');
        Num = Num.toString().split('-').join('');
      } else {
        return false
      }
      if (!isNaN(Num) || typeof Num == 'number') {
        return true
      } else {
        return false
      }
    } catch (Err) {
      console.log('Tools', `IsNum ${Err}`);
      return false
    }
  },

  is_obj(val) {
    if (typeof val == 'object') {
      return JSON.stringify(val);
    } else {
      return val;
    }
  },

  //--------------------------------------Trunk Number----------------------------------//
  Trunk(Value, Decimals) {
    if (this.IsNum(Value)) {
      try {
        let fix = this.DoNum(Value).toFixed(Decimals);
        return this.DoNum(fix);
      } catch (Err) {
        return undefined
      }
    }
  },

  //-------------------------------------INTIME-----------------------------------------//

  InTime(sch) {
    schedule = this.Jasper(sch)
    var i = 0
    let inTime = false
    var Day_Name = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
    while (i < schedule.length && !inTime) {
      let DBdays = schedule[i].Days
      let DBTime = schedule[i].Time

      let DBhourIni = DBTime.Init.split(':')[0]
      let DBMinIni = DBTime.Init.split(':')[1]
      let DBhourEnd = DBTime.Final.split(':')[0]
      let DBMinEnd = DBTime.Final.split(':')[1]

      var ActualDay = (new Date()).getDay()
      var ActualHrs = this.addZero(new Date()).getHours();
      var ActualMin = this.addZero(new Date()).getMinutes();

      DBdays.indexOf(Day_Name[ActualDay]) == -1 ? inTime = false : inTime = true
      i = i + 1;

      if (inTime) {
        inTime = false
        if (DBhourIni == ActualHrs && DBMinIni <= ActualMin) {
          inTime = true
        }
        if (DBhourIni < ActualHrs && DBhourEnd > ActualHrs) {
          inTime = true
        }
        if (DBhourEnd == ActualHrs && DBMinEnd >= ActualMin) {
          inTime = true
        }
      }
    }
    return inTime
  },

  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  },

  //-------------------------------------Existence--------------------------------------//
  Exists(D) {
    if (D === undefined || D === null || D === 'undefined' || D === 'null' || D === '') {
      return false;
    } else {
      return true
    }
  },

  //--------------------------------------Parse Bool------------------------------------//
  DoBool(V) {
    if (V === true || V === 1 || V === 'true' || V === '1' || V === 'True') {
      return true;
    }
    if (V === false || V === 0 || V === 'false' || V === '0' || V === 'False') {
      return false;
    }
  },

  //--------------------------------------Resolve Number--------------------------------//
  DoNum(Num) {
    try {
      if (this.IsNum(Num)) {
        Num = Num.toString().split(' ').join('');
        if (Num[0] == '-') {
          return -Number(Num.replace('-', ''))
        }
        if (Num[0] == '+') {
          return +Number(Num.replace('+', ''))
        }
        if (this.IsNum(Num[0])) {
          return +Number(Num)
        }
      } else {
        return undefined
      }
    } catch (Err) {
      console.log('Tools', `DoNum ${Err}`);
      return undefined
    }
  },

  //--------------------------------------Parse JSON------------------------------------//
  Jasper(Data) {
    try {
      if (typeof Data == 'string') {
        if (Data[0] == `"` || Data[0] == `'`) {
          Data = Data.slice(1, Data.length - 2);
        }

        let clr = Data.replace(/(\r\n|\n|\r|↵)/gm, '');
        return JSON.parse(clr);

      } else if (typeof Data == 'object') {
        if (Buffer && Buffer.isBuffer(Data)) {
          let rmk = Data.toString('utf8');
          return this.Jasper(rmk);
        } else if (this.Wasper(Data)[0] == '{' || this.Wasper(Data)[0] == '[') {
          return Data;
        } else {
          return {};
        }
      }
    } catch (Err) {
      return {};
    }
  },

  //-----------------------------If JSON Make String------------------------------------//
  IfObjMakeStr(val) {
    if (typeof val == 'object') {
      return JSON.stringify(val);
    } else {
      return '"' + val;
    }
  },


  //--------------------------------------Parse JSON------------------------------------//
  Wasper(Data) {
    try {
      if (typeof Data == 'object') {
        if (Buffer.isBuffer(Data)) {
          let str = Data.toString('utf8');
          return this.Wasper(str);
        } else {
          try {
            return JSON.stringify(Data);
          } catch (err) {
            console.log(err);
            return '';
          }
        }
      } else if (typeof Data == 'string') {
        let rmk = this.Jasper(Data);
        return this.Wasper(rmk);
      }
    } catch (Err) {
      console.log('Tools', `Wasper ${Err}`);
      return '{}'
    }
  },

  //-----------------------------------------Encode-------------------------------------//
  FormatKNX(DPT, Valor) {
    try {
      var Vi = Valor;
      var gDPT = DPT.split('.')[0];

      switch (gDPT) {
        case '1':
          return this.DoBool(Vi);
        case '2':
          return {
            value: this.DoBool(Vi[0]), control: this.DoBool(Vi[1])
          };
        case '3':
          Nu = this.IsNum(Vi[1]) ? true : false;
          return Nu ? {
            value: this.DoBool(Vi[0]),
            control: parseInt(Vi[1])
          } : null;
        case '4':
          return typeof Vi == 'string' ? Vi : null;
        case '5':
          Nu = this.IsNum(Vi) ? true : false;
          Kc = DPT == '5.001' ? true : false;
          Vi = Nu ? this.DoNum(Vi) : null;
          return Nu ? Kc ? this.DoNum(parseInt(Vi * 2.55)) : this.DoNum(parseInt(Vi)) : null;
        case '6':
        case '7':
        case '8':
          Nu = this.IsNum(Vi) ? true : false;
          return Nu ? this.DoNum(parseInt(this.DoNum(Vi))) : null;
        case '9':
          Nu = this.IsNum(Vi) ? true : false;
          return Nu ? this.DoNum(parseFloat(this.DoNum(Vi)).toFixed(3)) : null;
        case '10':
          fecha = Vi[0].split('/');
          hora = Vi[2].split(':');
          parse = fecha[0], fecha[1], fecha[2], hora[0], hora[1], hora[2];
          return {
            date: new Date(parse), dayOfWeek: Vi[1]
          };
        case '11':
          fecha = Vi[0].split('/');
          parse = fecha[0], fecha[1], fecha[2];
          return {
            date: new Date(parse), dayOfWeek: Vi[1]
          };
        case '12':
        case '13':
        case '14':
          return this.IsNum(Vi) ? parseFloat(Vi).toFixed(3) : null;
        case '16':
          return typeof Vi == 'string' ? Vi : null;
        case '17':
        case '20':
          return this.IsNum(Vi) ? parseInt(Vi) : null;
        case '24':
          return typeof Vi == 'string' ? Vi : null;
        case '232':
          Kc = DPT == '232.600' ? true : false;
          return Kc ? {
            r: Vi[0],
            g: Vi[1],
            b: Vi[2]
          } : null;
        default:
          return;
      }
    } catch (err) {
      console.log(err);
      return
    }
  },

  //---------------------------------------KNX Decode-----------------------------------//
  //   Decode(dpt, buffer) {
  //     try {
  //       return knx_dpt.decode(dpt, buffer);
  //     } catch (err) {
  //       console.log(err);
  //       return
  //     }
  //   },

  //-----------------------------------KNX Blind Decoder--------------------------------//
  SuperDecode(Value) {
    let Length = Value.length;
    if (Length == 1) {
      try {
        return this.Decode('1.001', Value)
      } catch (Err) { }
      try {
        return this.Decode('2.001', Value)
      } catch (Err) { }
      try {
        return this.Decode('3.001', Value)
      } catch (Err) { }
      try {
        return this.Decode('4.002', Value)
      } catch (Err) { }
      try {
        return this.Decode('5.003', Value)
      } catch (Err) { }
      try {
        return this.Decode('6.001', Value)
      } catch (Err) { }
    }
    if (Length == 2) {
      try {
        return this.Decode('7.001', Value)
      } catch (Err) { }
      try {
        return this.Decode('8.001', Value)
      } catch (Err) { }
      try {
        return this.Decode('9.003', Value)
      } catch (Err) { }
    }
    if (Length == 3) {
      try {
        return this.Decode('10.001', Value)
      } catch (Err) { }
      try {
        return this.Decode('11.001', Value)
      } catch (Err) { }
    }
    if (Length == 4) {
      try {
        return this.Decode('12.001', Value)
      } catch (Err) { }
      try {
        return this.Decode('13.001', Value)
      } catch (Err) { }
      try {
        return this.Decode('14.001', Value)
      } catch (Err) { }
    }
    return 0;
  },

  //-------------------------Get Date Time User Format (+Milliseconds)------------------//
  GetTime() {
    var DT = new Date().getTime() - new Date().getTimezoneOffset() * 60000;
    return (new Date(DT).toISOString().replace('T', ' ').split('Z')[0]);
  },

  //----------------------------Get Time ISO Format (Milliseconds)----------------------//
  GetTimeISO() {
    var DT = new Date().getTime() - new Date().getTimezoneOffset() * 60000;
    return new Date(DT).toISOString();
  },

  //-------------------------Get Time in Milliseconds from ISO Format-------------------//
  TimeToMS(DT) {
    return Number((new Date(DT)).getTime());
  },

  //------------------------------------Get Time Stamp----------------------------------//
  TimeStamp() {
    return new Date().getTime();
  },

  //----------------------Get Partial Seconds of the Day of the Week--------------------//
  WeekTimeToMS() {
    NewDT = new Date();
    Days = NewDT.getDay() - 1;
    Days = Days * 24 * 3600;
    Hour = NewDT.getHours() * 3600;
    Mins = NewDT.getMinutes() * 60;
    Secs = NewDT.getSeconds();
    return (Days + Hour + Mins + Secs) * 1000;
  },

  //-------------------------------------Trigger Event----------------------------------//
  Compare(Value1, Condition, Value2) {
    Result = false;
    if (Value1 === 'true' || Value1 === '1') {
      Value1 = 1
    }
    if (Value1 === 'false' || Value1 === '0') {
      Value1 = 0
    }

    if (Value2 === 'true' || Value2 === '1') {
      Value2 = 1
    }
    if (Value2 === 'false' || Value2 === '0') {
      Value2 = 0
    }

    Value1 = this.DoNum(Value1) || Value1;
    Value2 = this.DoNum(Value2) || Value2;

    if (Condition == '<') {
      if (Value1 < Value2) {
        Result = true
      }
    }
    if (Condition == '<=') {
      if (Value1 <= Value2) {
        Result = true
      }
    }
    if (Condition == '=') {
      if (Value1 == Value2) {
        Result = true
      }
    }
    if (Condition == '>') {
      if (Value1 > Value2) {
        Result = true
      }
    }
    if (Condition == '>=') {
      if (Value1 >= Value2) {
        Result = true
      }
    }
    // console.log('Trigger', `Val 1 vs Val 2 - ${Value1} ${Condition} ${Value2}`);
    return Result;
  },
  expirate_datetime(expiry_date) {
    const expiration_date = new Date(expiry_date);
    const current_date = new Date;
    let is_expired = expiration_date < current_date ? true : false;
    return is_expired;
  }
}
