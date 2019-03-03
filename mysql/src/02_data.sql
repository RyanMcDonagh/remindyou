USE remindyou;

INSERT INTO users (fName, lName, email) VALUES
    ("Adam", "Apple", "a.apple@gmail.com"),
    ("Becky", "Banana", "@gmail.com"),
    ("Colin", "Cookie", "@gmail.com")
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