#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>

const char *rootCACertificate =
    "-----BEGIN CERTIFICATE-----\n"
    "MIIFKjCCBBKgAwIBAgISA3ul3/pEgik76F8RDJiDRsKBMA0GCSqGSIb3DQEBCwUA\n"
    "MDIxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MQswCQYDVQQD\n"
    "EwJSMzAeFw0yMjA3MTIyMjI0MzBaFw0yMjEwMTAyMjI0MjlaMBcxFTATBgNVBAMM\n"
    "DCoudmVyY2VsLmFwcDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANPX\n"
    "nWtZ++cwzzvQwWakDM+rH5/wcpA+CCEzA7gDGbmsv4HhDVy9zF3yKfI5cKeyjaHY\n"
    "7dXluEIQjw1S/0LVYozAyB13DAZYSvSLns8bk3QSSakOa39lkoDSppgH2uxmBuKA\n"
    "UyTsRHeq3i6ZKAeUHtKIkRsKt5t4VgE9hzViNgsmYJGgTr2wB5BnMk17FTnKQWrD\n"
    "/fVqnD9ELI8Vs2hmV8ORVQSB6Y7BIBHqAEQCYeTp95aSH1TNdpPHNpYfNu59vPWg\n"
    "AlbhUvMkl9i9t/TZiIDg7DN9obNkMhbvo3JZJFCZrK9TJ4v2BtCoRUV6XeL5Oq8/\n"
    "ZYylCy0WulQOyjo/Dr8CAwEAAaOCAlMwggJPMA4GA1UdDwEB/wQEAwIFoDAdBgNV\n"
    "HSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwDAYDVR0TAQH/BAIwADAdBgNVHQ4E\n"
    "FgQU3KlSCvFfuA4kVo2OPtbaUVzi99swHwYDVR0jBBgwFoAUFC6zF7dYVsuuUAlA\n"
    "5h+vnYsUwsYwVQYIKwYBBQUHAQEESTBHMCEGCCsGAQUFBzABhhVodHRwOi8vcjMu\n"
    "by5sZW5jci5vcmcwIgYIKwYBBQUHMAKGFmh0dHA6Ly9yMy5pLmxlbmNyLm9yZy8w\n"
    "IwYDVR0RBBwwGoIMKi52ZXJjZWwuYXBwggp2ZXJjZWwuYXBwMEwGA1UdIARFMEMw\n"
    "CAYGZ4EMAQIBMDcGCysGAQQBgt8TAQEBMCgwJgYIKwYBBQUHAgEWGmh0dHA6Ly9j\n"
    "cHMubGV0c2VuY3J5cHQub3JnMIIBBAYKKwYBBAHWeQIEAgSB9QSB8gDwAHYAKXm+\n"
    "8J45OSHwVnOfY6V35b5XfZxgCvj5TV0mXCVdx4QAAAGB9Lp4lQAABAMARzBFAiEA\n"
    "4nYlRh7sZK80XGDDRcnD5NvAz5D0reAesIp9y1KvlAkCIFVUkEJFXh9YXLLLQBPT\n"
    "HXj00A8rl69YkVZu0JKcpxCZAHYA36Veq2iCTx9sre64X04+WurNohKkal6OOxLA\n"
    "IERcKnMAAAGB9Lp6lgAABAMARzBFAiBXDhdKeavIS2BRXtUtDrtgvdykNMa8aGOr\n"
    "OOXZs1kOvwIhAPYJLD/7CMSYLejuG6+Q/DtwZ9uUcJNsH9ZTorUp0VbSMA0GCSqG\n"
    "SIb3DQEBCwUAA4IBAQCsf7SHatCFBm7ck5zCVt7RW4Tw7wbkeyd/4b0kindCBndT\n"
    "VYKfdUnvLggm43E48kqnNh+L71D/kbRc7HygBQU+H74updjnv3TqTASFvnTny19W\n"
    "cQmdLds9pWU5TWY26j33NxSpM7qxWYpZImlmHgOuKzxThoMSmhW5fN3/qrfDH324\n"
    "MB1PTUdLcGNDFgixFPKsTfIK/CF+IRdZOTOylbAJnAL70j2fJn65McL4GoplcMgz\n"
    "GidhZ6pXlUepphN4sNDtaAyvoS23Y1kADOr5e9wTmajTir+Yp0kafCj05XmktBh3\n"
    "X0Z+hWaArTA9UAr2qecQyGRpL0/wQ8req3Cstxmc\n"
    "-----END CERTIFICATE-----\n";

// Not sure if WiFiClientSecure checks the validity date of the certificate.
// Setting clock just to be sure...
void setClock()
{
  configTime(0, 0, "pool.ntp.org");

  Serial.print(F("Waiting for NTP time sync: "));
  time_t nowSecs = time(nullptr);
  while (nowSecs < 8 * 3600 * 2)
  {
    delay(500);
    Serial.print(F("."));
    yield();
    nowSecs = time(nullptr);
  }

  Serial.println();
  struct tm timeinfo;
  gmtime_r(&nowSecs, &timeinfo);
  Serial.print(F("Current time: "));
  Serial.print(asctime(&timeinfo));
}

uint8_t PINS[] = {27, 26};

enum k
{
  Z = 0,
  CTRL = 1
};

const char *ssid = "ap_ssid";
const char *password = "password";

WiFiClientSecure client;

void setup()
{
  Serial.begin(115200);
  for (int i = 0; i < 2; i++)
  {
    pinMode(PINS[i], INPUT_PULLDOWN);
  }

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  setClock();
  // client.setCACert(rootCACertificate);
  client.setInsecure();
}

void loop()
{

  uint8_t v = 0;
  v |= (digitalRead(PINS[CTRL]) ? 1 : 0) << 0;
  v |= (digitalRead(PINS[Z]) ? 1 : 0) << 1;

  if (v)
  {
    if (WiFi.status() == WL_CONNECTED)
    {
      HTTPClient https;

      if (v & 1)
      {
        Serial.println("tentando fechar...");
      }
      else
      {
        Serial.println("tentando abrir...");
      }

      if (https.begin(client, v & 1 ? "https://lora-send-mshlz.vercel.app/api/gate/register" : "https://lora-send-mshlz.vercel.app/api/gate/register?type=OPEN"))
      {
        int httpCode = https.GET();

        // httpCode will be negative on error
        if (httpCode > 0)
        {
          // HTTP header has been send and Server response header has been handled
          Serial.printf("[HTTPS] GET... code: %d\n", httpCode);

          if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY)
          {
            String payload = https.getString();
            Serial.println(payload);
          }
        }
        else
        {
          Serial.printf("[HTTPS] GET... failed, error: %s\n", https.errorToString(httpCode).c_str());
        }

        https.end();
      }
    }
    else
    {
      Serial.println("WiFi Disconnected");
    }
  }

  delay(100);
}