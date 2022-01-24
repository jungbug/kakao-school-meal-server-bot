import fetch from "node-fetch"
// moment -> dayjs
import moment from "moment-timezone"
const URL = "https://open.neis.go.kr/hub/hisTimetable"
const KEY = "93a422e33eb446c0a9e2c3511ac76602"
let msg = null
export const init = async (req, res) => {
    msg = ""
    try {
        const params = new URLSearchParams()
        params.set("ATPT_OFCDC_SC_CODE", "P10")
        params.set("SD_SCHUL_CODE", "8320077")
        params.set("Type", "json")
        params.set("KEY", KEY)
        params.set("SEM", "2")
        params.set("ALL_TI_YMD", day())
        params.set("GRADE", "2")
        params.set("CLASS_NM", "7")
        console.log(params.toString())
        const data = await (await fetch(`${URL}?${params.toString()}`)).json()

        const {length} = data.hisTimetable[1].row
        
        for(let i = 0; i<length;i++){
            if(i === 0){
                msg = "과목"
            }
            msg = `${msg}
            ${i+1}.${data.hisTimetable[1].row[i].ITRT_CNTNT}
            `
        }
    } catch (error) {
        msg = "시간표가 없습니다"
    }

    res.json({
        "version": "2.0",
        "template": {
            outputs: [
                {
                    simpleText: {
                        text: msg
                    }
                }
            ]
        }
    })
}

const day = () => {
    let time1 = moment.tz("Asia/Seoul");
    return time1.format("YYYYMMDD")
}