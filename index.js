const express = require("express");
const app = express();
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const fs = require('fs');
const moment = require('moment');
app.use( express.static( "public" ) );
app.set('view engine', 'ejs')
const PORT = process.env.PORT || 4000;
const attendance = {
    "ledger": {
        "information": {
            "pay_cycle": "Sep 1st - Sep 30th",
            "salary":1010101,
            "worker_type":"Monthly",
            "phone_number":"19019201",
            "name":"Abhinav sarale"
        },
        "attendance": {
            "present_days": 30,
            "absent_days": 0,
            "half_days": 2,
            "paid_holidays":4
        },

        "attendance_details": [
        {
            "employee_id": "recUsdVm6dC49zVOU",
            "attendance_type": "Present",
            "date": "2020-10-10",
            "punch_in": "00",
            "punch_out": "00",
            "hours_worked": "08:00"
        },
        {
            "employee_id": "recUsdVm6dC49zVOU",
            "attendance_type": "Present",
            "date": "2020-10-09",
            "punch_in": "00",
            "punch_out": "00",
            "hours_worked": "08:00"
        },
        {
            "employee_id": "recUsdVm6dC49zVOU",
            "attendance_type": "Absent",
            "date": "2020-10-08",
            "punch_in": "00",
            "punch_out": "00",
            "hours_worked": "0:00"
        },
        {
            "employee_id": "recUsdVm6dC49zVOU",
            "attendance_type": "Half Day",
            "date": "2020-10-07",
            "punch_in": "00",
            "punch_out": "00",
            "hours_worked": "4:00"
        },
        {
            "employee_id": "recUsdVm6dC49zVOU",
            "attendance_type": "Present",
            "date": "2020-10-06",
            "punch_in": "00",
            "punch_out": "00",
            "hours_worked": "08:00"
        },
        {
            "employee_id": "recUsdVm6dC49zVOU",
            "attendance_type": "Present",
            "date": "2020-10-05",
            "punch_in": "00",
            "punch_out": "00",
            "hours_worked": "08:00"
        }
    ],

        "salary": {
            "total_salary_owed_number": 3840000,
            "net_adjustments": 576000,
            "net_salary": 4416000,
            "payments": 0,
            "net_payable": 4416000,
            "previous_balance": 10000000,
            "total_payable": 14416000,
            "salary_ledger": [
                {
                    "description": "Lembur agustus 20 off day 1 Muharram 7 j",
                    "amount": 126000,
                    "ledger_type": "Addition",
                    "date": "2020-09-27",
                    "adjustments_id": "rec0Yg1CA1EspL03x"
                },
                {
                    "description": "Lembur",
                    "amount": 54000,
                    "ledger_type": "Subtraction",
                    "date": "2020-08-22",
                    "adjustments_id": "recAGxkDFGvmEoWAR"
                },
                {
                    "description": "Lembur",
                    "amount": 54000,
                    "ledger_type": "Addition",
                    "date": "2020-08-22",
                    "adjustments_id": "recYDtJp3c1ZbvMfU"
                },
                {
                    "description": "Lembur off day 7 jam",
                    "amount": 126000,
                    "ledger_type": "Addition",
                    "date": "2020-09-26",
                    "adjustments_id": "recYMZrDLnVyi4d3F"
                },
                {
                    "description": "Lembur  3j",
                    "amount": 54000,
                    "ledger_type": "Addition",
                    "date": "2020-09-27",
                    "adjustments_id": "recgQdOAGlQWE9JU5"
                },
                {
                    "description": "Lembur agustus 22,29 sabtu 3j",
                    "amount": 108000,
                    "ledger_type": "Addition",
                    "date": "2020-09-27",
                    "adjustments_id": "rect71KixVqDH2ITx"
                },
                {
                    "description": "Lembur shift 3 jm",
                    "amount": 54000,
                    "ledger_type": "Addition",
                    "date": "2020-09-27",
                    "adjustments_id": "recyaAouspKeo9KoO"
                }
            ],
            "payments_ledger": [
                {
                    "description": "Luran sebelumnya dihapus",
                    "amount": 0,
                    "ledger_type": "Payment",
                    "date": "2020-09-23",
                    "adjustments_id": "recQKyhdyCV3xTeZV"
                }
            ]
        }
    }
}

app.get("/generateReport", (req, res) => {
    ejs.renderFile(path.join(__dirname, './views/', "pdf.ejs"), {reports: attendance,moment:moment}, (err, data) => {
    if (err) {
        console.log(err);
          res.send(err);
    } else {
       
        let options = {
            "height": "11.25in",
            "width": "8.5in",
            "header": { 
                "height": "-.9in"
            },
            "footer": {
                "height": "20mm",
            },
        };
        pdf.create(data, options).toFile("report.pdf", function (err, data) {
            if (err) {
                res.send(err);
            } else {
            
                res.download('report.pdf',() => {
                    fs.unlinkSync('report.pdf');
                });
            }
        });
    }

});

})
app.listen(4000,() => {

    console.log(`Server is running on port ${PORT}`)
});
