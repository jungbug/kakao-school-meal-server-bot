import fetch from "node-fetch"
import moment from "moment-timezone"
let msg = null
const URL = "https://open.neis.go.kr/hub/mealServiceDietInfo"
const KEY = "93a422e33eb446c0a9e2c3511ac76602"
export const init = async (req, res) => {
    try {
        const params = new URLSearchParams()
        params.set("ATPT_OFCDC_SC_CODE", "P10")
        params.set("SD_SCHUL_CODE", "8320077")
        params.set("Type", "json")
        params.set("KEY", KEY)
        params.set("MLSV_YMD", day())
        params.set("MMEAL_SC_CODE", "2")
        console.log(params.toString())
        const data = await (await fetch(`${URL}?${params.toString()}`)).json()
        msg = JSON.stringify(data.mealServiceDietInfo[1].row[0].DDISH_NM.split("-"))
    } catch (error) {
        msg = "밥이 없습니다"
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