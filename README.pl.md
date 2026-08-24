# SMS-Sport

# Sms-sport to aplikacja mająca zachęcić ludzi do uprawiania sportu dzięki stosowanemu kalkulatorowi oplacalności

🇵🇱 Polski | 🇬🇧 [English](README.md)

> **Uwaga**
>
> To repozytorium zawiera publiczną wersję projektu przygotowaną do celów portfolio.
>
> Oryginalna wersja projektu była rozwijana w prywatnym repozytorium. Ze względów bezpieczeństwa usunięto pliki konfiguracyjne, zmienne środowiskowe, klucze API oraz inne poufne dane.
>
>
> **Status projektu:** Projekt jest utrzymywany i dalej rozwijany. Bieżące zmiany są najpierw wprowadzane na tej gałęzi.
>
> Instrukcja uruchomienia projektu znajduje się na końcu tego pliku.

**Część frontendowa** napisana jest w React i wykorzystuje jego mniejsze biblioteki (React Queries - do połączenia z node.js i React-Datepicker - do wyboru daty). Do wyświetlania mapki użyłem Mapbox API.

**Część backendowa** została napisana w Node.js. Podpięta baza danych to MongoDB.

## Funkcjonalności
- Kalkulator opłacalności sportu (czas, koszt, kalorie)
- Mapa obiektów sportowych z możliwością wyboru trasy dojazdu
- Wybór środka transportu wpływający na czas dojazdu i obliczenia kalkulatora
- Wyświetlanie trasy dojazdu do wybranego obiektu
- Czaty dla poszczególnych aktywności sportowych

## Zrzuty ekranu:
<img width="1866" height="919" alt="Zrzut ekranu 2026-07-24 125659" src="https://github.com/user-attachments/assets/7cbd5e78-3436-44ab-a25e-bfb344627b82" />

![image](https://github.com/user-attachments/assets/b11afaad-2920-4009-ad6b-8c73f985c0c6)
<img width="940" height="729" alt="image" src="https://github.com/user-attachments/assets/41be5718-670f-429c-8727-a774d6ce4a86" />
<img width="1856" height="907" alt="image" src="https://github.com/user-attachments/assets/f63d4a4b-591a-441b-8a07-3ab9ffa8b2d2" />
![image](https://github.com/user-attachments/assets/968ede33-8cc8-48b3-ae83-a5d67a9b8bbb)
<img width="1834" height="914" alt="Zrzut ekranu 2026-08-24 201005" src="https://github.com/user-attachments/assets/1fe0df7e-0bd1-4056-9fca-de19ac49a992" />


## MongoDB - struktura bazy danych:
<img width="1698" height="613" alt="image" src="https://github.com/user-attachments/assets/80fb86e8-adea-4069-94bb-8324de3a349f" />

### Główna kolekcja:
<img width="1306" height="744" alt="image" src="https://github.com/user-attachments/assets/ee2ffb73-2b9f-435f-a31a-f06c23638db9" />

> Uwaga: Oryginalna wersja projektu była rozwijana w prywatnym repozytorium. To repozytorium zawiera publiczną wersję projektu przygotowaną do celów portfolio. Ze względów bezpieczeństwa pominięto w nim poufną konfigurację, klucze API oraz część plików konfiguracyjnych projektu.

## Jak uruchomić projekt

### Frontend

1. Przejdź do katalogu frontend:
```bash
cd Frontend
 ```
2. Zainstaluj zależności:
```bash
npm install
 ```
3. Utwórz plik .env na podstawie pliku .env.example i uzupełnij wymagane wartości.

4. Uruchom aplikację:
  ```
npm start
  ```
Backend

1. Przejdź do katalogu backend:
```
cd Backend
```
2. Zainstaluj zależności:
```
npm install
```
3. Utwórz plik .env na podstawie pliku .env.example i uzupełnij wymagane wartości.

4. Uruchom serwer:
```
node index.js
```
