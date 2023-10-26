# Custom Logic Homey-app

Custom Logic is een Homey-app die verschillende flow-actiekaarten biedt voor wiskundige berekeningen en het werken met tijdelijke waarden.

## Kenmerken

Actiekaarten (Alleen met advanced flows)
- Berekenen: Evalueer wiskundige uitdrukkingen met de 'calculate-float' en 'calculate-int' actiekaarten.
- Dagen: Bereken aantal dagen tussen twee datums.
- Willekeurige getallen: Genereer willekeurige getallen met 'generate-random-number' met gedefinieerde bereiken.
- Schrikkeljaar: Controleer op schrikkeljaren met de actiekaart 'check-schrikkeljaar' door de parameter 'jaar' op te geven.
- BMI berekenen: Bereken BMI met de actiekaart 'bereken-bmi' met de parameters 'gewicht' en 'lengte'.
- Wiskundige bewerkingen: Voer berekeningen uit met operatoren (+, -, *, /) met de actiekaart 'bereken' met de parameters 'getal1', 'getal2' en 'tekst' (operator).
- Tijdelijke waarden: Tijdelijke waarden (getallen, strings, URL's en afbeeldingen) opslaan en ophalen met de actiekaarten 'tijdelijk-getal', 'tijdelijke-string', 'tijdelijke-url' en 'tijdelijke-afbeelding'.
- Afbeelding weergeven: Haal afbeeldingen van een URL op en geef deze weer als tokens met de actiekaart 'tijdelijke-afbeelding' door de parameter 'imageUrl' op te geven.

Voorwaarde kaarten
- Getal Groter Dan: Controleer of een getal groter is dan een ander met de 'number_greater_than'-voorwaardekaart. Geef de parameters 'getal' en 'getal2' op.
- Getal kleiner dan: Bepaal of een getal kleiner is dan een ander met de 'number_less_than' conditie kaart. Geef de parameters 'getal' en 'getal2'.
- Tekst heeft waarde: Controleer of een tekst een specifieke waarde bevat met de conditiekaart 'text_has_value'. Gebruik 'tekst' en 'waarde' parameters.
- Tekst heeft precies: Controleer of een tekst precies gelijk is aan een opgegeven waarde met de 'text_has_exactly' conditiekaart. Geef 'tekst' en 'waarde' parameters.
- Booleaans is precies: Bepaal of een booleaanse waarde exact gelijk is aan 'true' met de 'boolean_is_exactly' conditiekaart. Geef de parameter 'boolean' op.


## Aan de slag
Om deze app te gebruiken, moet je hem installeren op je Homey-apparaat.

1. Open de Homey smartphone app.
2. Ga naar de sectie 'Apps'.
3. Zoek naar 'Custom Logic' en klik op 'Install'.
4. De actiekaarten kunnen worden gebruikt in Geavanceerde Flows voor verschillende taken en berekeningen.

