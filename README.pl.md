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
- Pełne wsparcie języka polskiego i angielskiego
- Przycisk do przełączania języka

## Zrzuty ekranu:

### Aplikacja:

<img width="1853" height="913" alt="image" src="https://github.com/user-attachments/assets/bfdb7671-9a4c-4481-97b6-48d59e1694d8" />

<img width="1857" height="910" alt="image" src="https://github.com/user-attachments/assets/f5b3093e-643f-4521-91d4-c9f837f3de45" />

<img width="1852" height="901" alt="image" src="https://github.com/user-attachments/assets/edc8f8f7-c5a7-45b5-a330-98b4fd4b15bb" />

<img width="1822" height="910" alt="image" src="https://github.com/user-attachments/assets/fd157c0e-c46d-4629-8398-3e68de583670" />


<img width="1864" height="906" alt="image" src="https://github.com/user-attachments/assets/58e5adef-4ce5-4d9f-983a-01718afc1561" />

<img width="1844" height="896" alt="image" src="https://github.com/user-attachments/assets/c061ffa9-ef80-4599-837e-de122af67e75" />


<img width="1823" height="903" alt="image" src="https://github.com/user-attachments/assets/c956df4d-dbc7-4dea-ac9b-10572ba2cc23" />



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
