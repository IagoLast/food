const fetch = require('node-fetch');
const parser = require('fast-xml-parser');


main();


async function main() {
    let data = [];
    for (let i = 0; i < 3000; i++) {
        if (i % 25 === 0) {
            console.warn('Procesing...', i);
        }
        const res = await _queryFood(i);
        if (res) {
            data.push(res);
        }
    }
    data = data.sort((a, b) => a.id - b.id);
    console.log(JSON.stringify(data, null, '\t'))
}

async function _queryFood(id) {
    const content = _buildQuery(id);
    try {

        const raw = await fetch('http://www.bedca.net/bdpub/procquery.php', {
            method: 'POST',
            body: content,
            headers: {
                'Content-Type': 'text/xml',
            }
        });
        const text = await raw.text();
        const data = _simplifyResponse(parser.parse(text));
        return data;
    } catch (err) {
        return null;
    }
}

function _simplifyResponse(rawResponse) {
    if (!rawResponse || !rawResponse.foodresponse || !rawResponse.foodresponse.food || !rawResponse.foodresponse.food.f_id) {
        return;
    }
    return {
        id: rawResponse.foodresponse.food.f_id,
        name: rawResponse.foodresponse.food.f_ori_name,
        values: getFoodValues(rawResponse)
    }
}

function getFoodValues(rawResponse) {
    return rawResponse.foodresponse.food.foodvalue.map(rawFoodValue => {
        return {
            name: rawFoodValue.c_ori_name,
            amount: rawFoodValue.best_location,
            unit: rawFoodValue.u_id,
        }
    })
}

function _buildQuery(code) {
    return `<?xml version="1.0" encoding="utf-8"?>
    <foodquery>
        <type level="2"/>
        <selection>
            <atribute name="f_id"/>
            <atribute name="f_ori_name"/>
            <atribute name="f_eng_name"/>
            <atribute name="sci_name"/>
            <atribute name="langual"/>
            <atribute name="foodexcode"/>
            <atribute name="mainlevelcode"/>
            <atribute name="codlevel1"/>
            <atribute name="namelevel1"/>
            <atribute name="codsublevel"/>
            <atribute name="codlevel2"/>
            <atribute name="namelevel2"/>
            <atribute name="f_des_esp"/>
            <atribute name="f_des_ing"/>
            <atribute name="photo"/>
            <atribute name="edible_portion"/>
            <atribute name="f_origen"/>
            <atribute name="c_id"/>
            <atribute name="c_ori_name"/>
            <atribute name="c_eng_name"/>
            <atribute name="eur_name"/>
            <atribute name="componentgroup_id"/>
            <atribute name="glos_esp"/>
            <atribute name="glos_ing"/>
            <atribute name="cg_descripcion"/>
            <atribute name="cg_description"/>
            <atribute name="best_location"/>
            <atribute name="v_unit"/>
            <atribute name="moex"/>
            <atribute name="stdv"/>
            <atribute name="min"/>
            <atribute name="max"/>
            <atribute name="v_n"/>
            <atribute name="u_id"/>
            <atribute name="u_descripcion"/>
            <atribute name="u_description"/>
            <atribute name="value_type"/>
            <atribute name="vt_descripcion"/>
            <atribute name="vt_description"/>
            <atribute name="mu_id"/>
            <atribute name="mu_descripcion"/>
            <atribute name="mu_description"/>
            <atribute name="ref_id"/>
            <atribute name="citation"/>
            <atribute name="at_descripcion"/>
            <atribute name="at_description"/>
            <atribute name="pt_descripcion"/>
            <atribute name="pt_description"/>
            <atribute name="method_id"/>
            <atribute name="mt_descripcion"/>
            <atribute name="mt_description"/>
            <atribute name="m_descripcion"/>
            <atribute name="m_description"/>
            <atribute name="m_nom_esp"/>
            <atribute name="m_nom_ing"/>
            <atribute name="mhd_descripcion"/>
            <atribute name="mhd_description"/>
        </selection>
        <condition>
            <cond1>
                <atribute1 name="f_id"/>
            </cond1>
            <relation type="EQUAL"/>
            <cond3>${code}</cond3>
        </condition>
        <condition>
            <cond1>
                <atribute1 name="publico"/>
            </cond1>
            <relation type="EQUAL"/>
            <cond3>1</cond3>
        </condition>
        <order ordtype="ASC">
            <atribute3 name="componentgroup_id"/>
        </order>
    </foodquery>
`;
}