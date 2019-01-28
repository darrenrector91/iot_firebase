// system_profiler SPUSBDataType

#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <ESP8266HTTPClient.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>

#define WIFI_SSID "*******"
#define WIFI_PASSWORD "*******"
#define FIREBASE_HOST "*******-*****.firebaseio.com"
#define MOISTURE "soil_moisture"
#define READSOILPIN A0
#define MAXDRYNESS 200 // higher number is more dry
#define WATERDELAY 750
#define WATERPOSTDELAY 5000

//Set timing values
const long interval = 10000;
unsigned long previousMillis = 0;

// IFTTT url string with API key
const char *resource = "https://maker.ifttt.com/trigger/soil_moisture/with/key/{{REPLACE WITH YOUR FIREBASE KEY}}";

// Maker Webhooks IFTTT
const char *server = "maker.ifttt.com";

int redPin = 16;
int grnPin = 14;
int PUMP = 5;
int n = 0;

void setup()
{
    Serial.begin(115200); // open serial port, set the baud rate as 115200 bps
    delay(10);

    pinMode(redPin, OUTPUT);
    pinMode(grnPin, OUTPUT);
    pinMode(READSOILPIN, INPUT);
    pinMode(PUMP, OUTPUT);

    // We start by connecting to a WiFi network
    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(WIFI_SSID);

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());

    // Let's connect to Firebase
    Firebase.begin(FIREBASE_HOST);
    Firebase.set("PUMP_STATUS", 0);
}

void loop()
{
    unsigned long currentMillis = millis();

    if (currentMillis - previousMillis >= interval)
    {
        previousMillis = currentMillis;

        water();
    }
}

void water()
{

    int soil_moisture = analogRead(READSOILPIN); //connect sensor to A0
    Serial.println("");
    Serial.println("soil moisture ");
    Serial.print(soil_moisture); //print the value to serial port

    // get value from Firebase
    n = Firebase.getInt("PUMP_STATUS");

    if (soil_moisture <= 600)
    {
        digitalWrite(grnPin, LOW);
        digitalWrite(redPin, HIGH);
        digitalWrite(PUMP, HIGH);
    }
    else
    {
        digitalWrite(grnPin, HIGH);
        digitalWrite(redPin, LOW);
        digitalWrite(PUMP, LOW);

        if (n == 1)
        {
            Serial.println("");
            Serial.println("PUMP ON");
            digitalWrite(PUMP, HIGH);
            return;
        }
        else
        {
            Serial.println("");
            Serial.println("PUMP OFF");
            Serial.print("");
            digitalWrite(PUMP, LOW);
            return;
        }
    }
    // Push to Firebase Realtime Database
    Firebase.pushInt(MOISTURE, soil_moisture);
    if (Firebase.failed())
    {
        Serial.print("pushing failed:");
        Serial.println(Firebase.error());
        return;
    }
}