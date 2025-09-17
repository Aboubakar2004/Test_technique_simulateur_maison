from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import numpy_financial
import datetime


def calculer_mensualite(
    duree_annees: int,
    prix_bien: float,
    taux_interet: float,
    taux_assurance: float,
    apport: float,
    mois: str,
    annee: str,
    frais_agence_pct: float,
    frais_notaire_pct: float,
    travaux: float,
    revalorisation_bien_pct: float,
):
    c_depart = prix_bien
    frais_agence = (frais_agence_pct / 100.0) * prix_bien
    frais_notaire = (frais_notaire_pct / 100.0) * prix_bien
    capital = prix_bien - apport
    garantie_bancaire = (1.5 / 100.0) * capital
    if garantie_bancaire < 0:
        garantie_bancaire = 0
    if frais_agence < 0:
        frais_agence = 0
    capital = capital + frais_notaire + garantie_bancaire + frais_agence + travaux

    n_annees = duree_annees
    n = n_annees * 12
    t_mensuel_pct = (taux_interet / 12.0)
    q = 1 + t_mensuel_pct / 100.0
    mensualite = (q ** n * capital * (1 - q) / (1 - q ** n)) + capital * ((taux_assurance / 100.0) / 12.0)
    assurance_totale = capital * ((taux_assurance / 100.0)) * (n / 12.0)
    interets_totaux = n * mensualite - capital

    t2 = taux_interet * 1 / 100.0
    date_str = f"{mois}/01/{annee}"
    rng = pd.date_range(start=date_str, periods=n, freq="MS")
    rng.name = "Date"
    df = pd.DataFrame(index=rng, columns=["Mensualité", "Capital Amorti", "Intérêts", "Capital restant dû"], dtype="float64")
    df.reset_index(inplace=True)
    df.index += 1
    df.index.name = "Mois"

    df["Mensualité"] = -1 * numpy_financial.pmt(t2 / 12.0, n, capital) + capital * ((taux_assurance / 100.0) / 12.0)
    df["Capital Amorti"] = -1 * numpy_financial.ppmt(t2 / 12.0, df.index, n, capital)
    df["Intérêts"] = -1 * numpy_financial.ipmt(t2 / 12.0, df.index, n, capital)
    df = df.round(2)

    df["Capital restant dû"] = 0.0
    df.loc[1, "Capital restant dû"] = float(capital - df.loc[1, "Capital Amorti"])
    for period in range(2, len(df) + 1):
        previous_balance = df.loc[period - 1, "Capital restant dû"]
        principal_paid = df.loc[period, "Capital Amorti"]
        if previous_balance == 0:
            continue
        elif principal_paid <= previous_balance:
            df.loc[period, "Capital restant dû"] = float(previous_balance - principal_paid)

    salaire_minimum = int((mensualite * 100.0) / 35.0)

    total_a_financer = capital
    cout_total_credit = float(interets_totaux + assurance_totale)
    cout_total_projet = float(c_depart + frais_notaire + garantie_bancaire + frais_agence + travaux)

    return {
        "mensualite": float(round(mensualite, 2)),
        "cout_credit": float(round(cout_total_credit, 2)),
        "cout_projet": float(round(cout_total_projet, 2)),
        "capacite_emprunt": float(round(total_a_financer, 2)),
        "taux_endettement": 35,  
        "salaire_minimum": int(salaire_minimum),
    }


app = Flask(__name__)
CORS(app)


@app.post("/simulate")
def simulate():
    data = request.get_json(force=True) or {}

    prix_bien = float(data.get("prix_bien", 0))
    duree = int(data.get("duree_annees", 0))
    taux_interet = float(data.get("taux_interet", 0))
    taux_assurance = float(data.get("taux_assurance", 0))
    apport = float(data.get("apport", 0))
    frais_notaire_pct = float(data.get("frais_notaire_pct", 0))
    travaux = float(data.get("travaux", 0))
    revalorisation_pct = float(data.get("revalorisation_bien_pct", 0))
    debut_pret = data.get("debut_pret", "")
    frais_agence_pct = float(data.get("frais_agence_pct", 0)) 
    try:
   
        dt = datetime.datetime.strptime(debut_pret, "%Y-%m-%d") if debut_pret else datetime.datetime.today()
        mois = f"{dt.month:02d}"
        annee = f"{dt.year}"

        result = calculer_mensualite(
            duree_annees=duree,
            prix_bien=prix_bien,
            taux_interet=taux_interet,
            taux_assurance=taux_assurance,
            apport=apport,
            mois=mois,
            annee=annee,
            frais_agence_pct=frais_agence_pct,
            frais_notaire_pct=frais_notaire_pct,
            travaux=travaux,
            revalorisation_bien_pct=revalorisation_pct,
        )
        return jsonify({"ok": True, "data": result})
    except Exception as exc:
        return jsonify({"ok": False, "error": str(exc)}), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)


