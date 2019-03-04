USE remindyou;

INSERT INTO users (fName, lName, email, hash) VALUES
    ("Adam", "Apple", "a.apple@gmail.com", "3A7BD3E2360A3D29EEA436FCFB7E44C735D117C42D1C1835420B6B9942DD4F1B"),
    ("Becky", "Banana", "b.banana@gmail.com", "B493D48364AFE44D11C0165CF470A4164D1E2609911EF998BE868D46ADE3DE4E"),
    ("Colin", "Cookie", "c.cookie@gmail.com", "946040ACF82BA0547E32B167F0EFC206EAE99234A350EBC94D9829B88CC8A787")
;

INSERT INTO lists (user, title) VALUES
    (1, "Home"),
    (1, "Work"),
    (2, "Work"),
    (2, "Sport"),
    (3, "Home"),
    (3, "Sport")
;

INSERT INTO tasks (list_id, title, description) VALUES
    (1, "Buy food", "Apples, Bread, Eggs, Butter, Chocolate"),
    (1, "Walk Spot", "No more than 10 mins!"),
    (2, "Write forecasts", "Income, Expenditure, Weather"),
    (2, "Meet Dave", "Opportunity with Insert Company Name Here"),
    (3, "Arrange Papers", "Why do I create such a mess?"),
    (3, "Transcribe meeting notes", "Management meeting 01/02/19"),
    (4, "Run for 30 minutes", "Average 5 min/km"),
    (4, "Pay football membership", "£15 to Sandy"),
    (5, "Meter Readings", "By 08/03/19"),
    (5, "Bake a cake", "Just a pasttime, really"),
    (6, "Arrange Dodgeball bus", "Call Barfords, bus for 15")
;