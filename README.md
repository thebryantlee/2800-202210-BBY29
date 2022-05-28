# 2800-202210-BBY29
# Tech to the Moon
* https://techtothemoon.herokuapp.com/

Our project, Tech to the Moon, is developing a computer information/social application to help computer builders with finding affordable components.

## Technologies used:
### Front end:
* HTML
* CSS
* Bootstrap

### Middleware:
* MySQL
* JawsDB

### Back end:
* Javascript
* Node.js
* Socket.io
* Bcrypt
* Express
* Moment
* Path
* HTTP
* FormSpree
* Puppeteer
* Dotenv
* Heroku


## How to Install or Run the Project
### In order to run this app, you will need to install:
* Express
* Socket.io
* moment
* mySQL
* HTTP
* Crypto
* dotenv
* Puppeteer
* Path

* Additionally, you will need to be familiar with the command line/terminal to run the app locally on your machine.

* You will not need any API keys.

* The order of installation should be:
    * Express
    * moment
    * Socket.io
    * dotenv
    * Puppeteer
* You can install these in the backend js file.

### Configuration Instructions
* node index.js to run locally
* https://techtothemoon.herokuapp.com/

### Link to Testing Sheet
* https://docs.google.com/spreadsheets/d/1dwZvIvQQXIZjgkJ0cJdpUJt25E7E73_-4OKTMI67RC0/edit?usp=sharing


## How to use the Product
* Price Tracking Api : Tracks prices of pc components from known websites like Best Buy, Amazon and Newegg and displays the lowest prices to the user. (Unfortunately the free API that we used (puppeteer) is incompatible with heroku and gives the app a hard time to display all the information. It works perfectly fine when run locally but it will slow down or sometimes even crash the app when run on Heroku.
* There are two chat features. One is with a chatbot which helps the user to navigate through the website and also a chat room for the users to talk to each other.
* We have a merchandise shop where you can buy TTTM merch!
* We also have a news feed where you can stay up to date on the latest news on PC components.

## Credits, References, and Licenses
* JQuery Easings
* getTotalLength - https://gist.github.com/SebLambla/3e0550c496c236709744
* Bootstrap 
* Unsplash - Free stock images
* Figma - Iconify Plugin
* Puppeteer
* Dotenv
* Socket.io
* Node.js
* Bcrypt
* Express
* Moment 
* Path
* HTTP
* FromSpree
* Heroku
* MySQL
* JawsDB

## Contact Information
Bryant Lee
Email: blee341@my.bcit.ca

Kasra Esfahanian
Email: kasraesf1383@gmail.com

Gabriel Clarin
Email: gclarin@my.bcit.ca

Jacob Romano Carlsen
Email: jromanocarlsen@my.bcit.ca

TechToTheMoon
Email: techtothemoonbby29@gmail.com

## Tree
C:.
│   .env
│   .gitignore
│   about.html
│   account.html
│   admin.html
│   chat.html
│   chatroom.html
│   contact.html
│   data.sql
│   index.html
│   index.js
│   landing.html
│   news.html
│   package-lock.json
│   package.json
│   Procfile
│   README.md
│   readme.txt
│   shop-confirm.html
│   shop-summary.html
│   shop.html
│   sql.txt
│   template.html
│   tracker.html
│
├───css
│       chat.css
│       chatbot.css
│       contact.css
│       easteregg.css
│       landing.css
│       shop-confirm.css
│       shop.css
│       shopping.css
│       style.css
│       template.css
│
├───fonts
│       Exo2-VariableFont_wght.ttf
│
├───img
│   ├───avatars
│   │       user-black.svg
│   │       user-blue.svg
│   │       user-green.svg
│   │       user-orange.svg
│   │       user-pink.svg
│   │       user-purple.svg
│   │       user-white.svg
│   │       user-yellow.svg
│   │
│   ├───icons
│   │   │   coolicons _ Free Iconset (Community).png
│   │   │
│   │   ├───arrow
│   │   │       caret_down.svg
│   │   │       caret_left.svg
│   │   │       caret_right.svg
│   │   │       caret_up.svg
│   │   │       chevron_big_down.svg
│   │   │       chevron_big_left.svg
│   │   │       chevron_big_right.svg
│   │   │       chevron_duo_left.svg
│   │   │       chevron_duo_right.svg
│   │   │       chevron_duo_up.svg
│   │   │       chevron_up.svg
│   │   │       circle_chevron_down.svg
│   │   │       circle_chevron_right.svg
│   │   │       circle_chevron_up.svg
│   │   │       circle_down.svg
│   │   │       circle_left.svg
│   │   │       circle_right.svg
│   │   │       circle_up.svg
│   │   │       compare.svg
│   │   │       expand.svg
│   │   │       first_page.svg
│   │   │       last_page.svg
│   │   │       left_light.svg
│   │   │       long_bottom_down.svg
│   │   │       long_bottom_up.svg
│   │   │       long_down.svg
│   │   │       long_left.svg
│   │   │       long_right.svg
│   │   │       long_up.svg
│   │   │       long_up_left_.svg
│   │   │       long_up_right.svg
│   │   │       short_down.svg
│   │   │       short_left.svg
│   │   │       short_right.svg
│   │   │       short_up.svg
│   │   │       shrink.svg
│   │   │       small_long_down.svg
│   │   │       small_long_left.svg
│   │   │       small_long_right.svg
│   │   │       small_long_up.svg
│   │   │       sub_left.svg
│   │   │       sub_right.svg
│   │   │       thin_big_left.svg
│   │   │       thin_big_right.svg
│   │   │       thin_big_up.svg
│   │   │       thin_long_02_left.svg
│   │   │       thin_long_02_right.svg
│   │   │       thin_long_02_up.svg
│   │   │       thin_long_down.svg
│   │   │       thin_long_left.svg
│   │   │       thin_long_right.svg
│   │   │       thin_long_up.svg
│   │   │       unfold_less.svg
│   │   │       unfold_more.svg
│   │   │
│   │   ├───attention
│   │   │       error.svg
│   │   │       error_outline.svg
│   │   │       info_circle.svg
│   │   │       info_circle_outline.svg
│   │   │       info_square.svg
│   │   │       warning.svg
│   │   │       warning_outline.svg
│   │   │
│   │   ├───basic
│   │   │       alarm.svg
│   │   │       alarm_add.svg
│   │   │       book-outline.svg
│   │   │       bug.svg
│   │   │       chatroom.svg
│   │   │       checkbox.svg
│   │   │       checkbox_checked.svg
│   │   │       checkbox_square.svg
│   │   │       circle_check.svg
│   │   │       circle_check_outline.svg
│   │   │       clock.svg
│   │   │       coffee-togo.svg
│   │   │       color.svg
│   │   │       command.svg
│   │   │       confused.svg
│   │   │       credit_card.svg
│   │   │       credit_card_alt.svg
│   │   │       done_all.svg
│   │   │       download.svg
│   │   │       download_done.svg
│   │   │       eventCalendar.svg
│   │   │       exit.svg
│   │   │       external_link.svg
│   │   │       flag_fill.svg
│   │   │       flag_outline.svg
│   │   │       heart_fill.svg
│   │   │       help_circle.svg
│   │   │       help_questionmark.svg
│   │   │       image_alt.svg
│   │   │       label.svg
│   │   │       layers.svg
│   │   │       layers_alt.svg
│   │   │       link.svg
│   │   │       link_02.svg
│   │   │       loading.svg
│   │   │       location.svg
│   │   │       location_outline.svg
│   │   │       log_out.svg
│   │   │       mail.svg
│   │   │       mail_open.svg
│   │   │       map.svg
│   │   │       moon.svg
│   │   │       newBadge.svg
│   │   │       news.svg
│   │   │       off_close.svg
│   │   │       off_outline_close.svg
│   │   │       path.svg
│   │   │       phone.svg
│   │   │       radio.svg
│   │   │       radio_filled.svg
│   │   │       randomDice.svg
│   │   │       refresh.svg
│   │   │       robot.svg
│   │   │       sad.svg
│   │   │       settings-grey.svg
│   │   │       settings.svg
│   │   │       settings_filled.svg
│   │   │       settings_future.svg
│   │   │       share.svg
│   │   │       share_outline.svg
│   │   │       shopping-cart.svg
│   │   │       slider_01.svg
│   │   │       slider_02.svg
│   │   │       slider_03.svg
│   │   │       stock-icon.svg
│   │   │       stopwatch.svg
│   │   │       sun.svg
│   │   │       support.svg
│   │   │       tag-outline.svg
│   │   │       tag.svg
│   │   │       techCompany.svg
│   │   │       trash_empty.svg
│   │   │       trash_full.svg
│   │   │       unlink.svg
│   │   │       update-log.svg
│   │   │       updatePaper.svg
│   │   │
│   │   ├───brand
│   │   │       adobe_xd.svg
│   │   │       amazon-logo.svg
│   │   │       apple.svg
│   │   │       app_store.svg
│   │   │       behance.svg
│   │   │       best-buy-logo.svg
│   │   │       coolicons.svg
│   │   │       css3.svg
│   │   │       discord.svg
│   │   │       dribbble.svg
│   │   │       dropbox.svg
│   │   │       Figma.svg
│   │   │       github.svg
│   │   │       google.svg
│   │   │       html5.svg
│   │   │       invision.svg
│   │   │       javascript.svg
│   │   │       LinkedIn.svg
│   │   │       linkpath.svg
│   │   │       messenger.svg
│   │   │       newegg-logo.svg
│   │   │       paypal.svg
│   │   │       play_store.svg
│   │   │       reddit.svg
│   │   │       Sketch.svg
│   │   │       slack.svg
│   │   │       snapchat.svg
│   │   │       spectrum.svg
│   │   │       spotify.svg
│   │   │       stack_overflow.svg
│   │   │       trello.svg
│   │   │       unsplash.svg
│   │   │
│   │   ├───calendar
│   │   │       calendar_calendar.svg
│   │   │       calendar_check.svg
│   │   │       calendar_edit.svg
│   │   │       calendar_event.svg
│   │   │       calendar_minus.svg
│   │   │       calendar_plus.svg
│   │   │       calendar_week.svg
│   │   │       calendar_x.svg
│   │   │
│   │   ├───chart
│   │   │       bar_chart.svg
│   │   │       bar_chart_alt.svg
│   │   │       bar_chart_horizontal.svg
│   │   │       bar_chart_square.svg
│   │   │       doughnut_chart.svg
│   │   │       line_chart_down.svg
│   │   │       line_chart_up.svg
│   │   │       pie_chart_25.svg
│   │   │       pie_chart_50.svg
│   │   │       pie_chart_75.svg
│   │   │       pie_chart_outline_25.svg
│   │   │       stock_trend.svg
│   │   │       trending_down.svg
│   │   │       trending_up.svg
│   │   │
│   │   ├───device
│   │   │       devices.svg
│   │   │       mobile.svg
│   │   │
│   │   ├───edit
│   │   │       add_to_queue.svg
│   │   │       comment.svg
│   │   │       comment_check.svg
│   │   │       comment_minus.svg
│   │   │       comment_plus.svg
│   │   │       copy.svg
│   │   │       edit.svg
│   │   │       hide.svg
│   │   │       list_check.svg
│   │   │       list_minus.svg
│   │   │       list_ol.svg
│   │   │       list_plus.svg
│   │   │       list_ul.svg
│   │   │       minus.svg
│   │   │       minus_circle.svg
│   │   │       minus_circle_outline.svg
│   │   │       minus_square.svg
│   │   │       move.svg
│   │   │       move_horizontal.svg
│   │   │       move_vertical.svg
│   │   │       plus.svg
│   │   │       plus_circle.svg
│   │   │       plus_circle_outline.svg
│   │   │       plus_square.svg
│   │   │       search_small.svg
│   │   │       search_small_minus.svg
│   │   │       search_small_plus.svg
│   │   │       select_multiple.svg
│   │   │       show.svg
│   │   │       text_align_center.svg
│   │   │       text_align_justify.svg
│   │   │       text_align_left.svg
│   │   │       text_align_right.svg
│   │   │
│   │   ├───Element
│   │   │   │   Arrow.png
│   │   │   │   Attention.png
│   │   │   │   Basic.png
│   │   │   │   Brand.png
│   │   │   │   Calendar.png
│   │   │   │   Chart.png
│   │   │   │   Device.png
│   │   │   │   Edit.png
│   │   │   │   File.png
│   │   │   │   Grid.png
│   │   │   │   Head Icons-1.svg
│   │   │   │   Head Icons-10.svg
│   │   │   │   Head Icons-11.svg
│   │   │   │   Head Icons-12.svg
│   │   │   │   Head Icons-13.svg
│   │   │   │   Head Icons-14.svg
│   │   │   │   Head Icons-15.svg
│   │   │   │   Head Icons-16.svg
│   │   │   │   Head Icons-2.svg
│   │   │   │   Head Icons-3.svg
│   │   │   │   Head Icons-4.svg
│   │   │   │   Head Icons-5.svg
│   │   │   │   Head Icons-6.svg
│   │   │   │   Head Icons-7.svg
│   │   │   │   Head Icons-8.svg
│   │   │   │   Head Icons-9.svg
│   │   │   │   Head Icons.svg
│   │   │   │   Home.png
│   │   │   │   Media.png
│   │   │   │   Menu.png
│   │   │   │   Misc.png
│   │   │   │   Notification.png
│   │   │   │   System.png
│   │   │   │   User.png
│   │   │   │
│   │   │   └───Element
│   │   │           Notification-1.png
│   │   │           Notification-2.png
│   │   │           Notification-3.png
│   │   │           Notification.png
│   │   │
│   │   ├───file
│   │   │       cloud.svg
│   │   │       cloud_check.svg
│   │   │       cloud_close.svg
│   │   │       cloud_down.svg
│   │   │       cloud_off.svg
│   │   │       cloud_outline.svg
│   │   │       cloud_up.svg
│   │   │       file_archive.svg
│   │   │       file_blank_fill.svg
│   │   │       file_blank_outline.svg
│   │   │       file_css.svg
│   │   │       file_find.svg
│   │   │       file_html.svg
│   │   │       file_image.svg
│   │   │       file_jpg.svg
│   │   │       file_js.svg
│   │   │       file_minus.svg
│   │   │       file_new.svg
│   │   │       file_pdf.svg
│   │   │       file_png.svg
│   │   │       file_svg.svg
│   │   │       folder.svg
│   │   │       folder_minus.svg
│   │   │       folder_open.svg
│   │   │       folder_plus.svg
│   │   │       note.svg
│   │   │
│   │   ├───grid
│   │   │       dashboard.svg
│   │   │       dashboard_02.svg
│   │   │       grid.svg
│   │   │       grid_big_round.svg
│   │   │       grid_horizontal.svg
│   │   │       grid_horizontal_round.svg
│   │   │       grid_round.svg
│   │   │       grid_small.svg
│   │   │       grid_small_round.svg
│   │   │       grid_vertical.svg
│   │   │       grid_vertical_round.svg
│   │   │
│   │   ├───home
│   │   │       building.svg
│   │   │       home_alt_check.svg
│   │   │       home_alt_fill.svg
│   │   │       home_alt_minus.svg
│   │   │       home_alt_plus.svg
│   │   │       home_alt_x.svg
│   │   │       home_check.svg
│   │   │       home_empty.svg
│   │   │       home_fill.svg
│   │   │       home_heart-1.svg
│   │   │       home_heart.svg
│   │   │       home_minus.svg
│   │   │       home_outline.svg
│   │   │       home_plus.svg
│   │   │       home_x.svg
│   │   │
│   │   ├───Logo
│   │   │       Kryston Schwarze Logo Dark.png
│   │   │
│   │   ├───media
│   │   │       airplay.svg
│   │   │       cast.svg
│   │   │       fast_forward.svg
│   │   │       fast_rewind.svg
│   │   │       pause_circle_filled.svg
│   │   │       pause_circle_outline.svg
│   │   │       play_arrow.svg
│   │   │       play_circle_filled.svg
│   │   │       play_circle_outline.svg
│   │   │       repeat.svg
│   │   │       shuffle.svg
│   │   │       skip_next.svg
│   │   │       skip_previous.svg
│   │   │
│   │   ├───menu
│   │   │       close_big.svg
│   │   │       hamburger-light.svg
│   │   │       hamburger.svg
│   │   │       menu_alt_01.svg
│   │   │       menu_alt_02.svg
│   │   │       menu_alt_03.svg
│   │   │       menu_alt_04.svg
│   │   │       menu_alt_05.svg
│   │   │       menu_duo.svg
│   │   │       more_horizontal.svg
│   │   │       more_vertical.svg
│   │   │       sign-out.svg
│   │   │
│   │   ├───misc
│   │   │       dot_01_xs.svg
│   │   │       dot_02_s.svg
│   │   │       dot_03_m.svg
│   │   │       dot_04_l.svg
│   │   │       line_l.svg
│   │   │       line_m.svg
│   │   │       line_s.svg
│   │   │       line_sx.svg
│   │   │       line_xl.svg
│   │   │
│   │   ├───notification
│   │   │       notification.svg
│   │   │       notification_active.svg
│   │   │       notification_deactivated.svg
│   │   │       notification_dot.svg
│   │   │       notification_minus.svg
│   │   │       notification_outline.svg
│   │   │       notification_outline_dot.svg
│   │   │       notification_outline_minus.svg
│   │   │       notification_outline_plus.svg
│   │   │       notification_plus.svg
│   │   │
│   │   ├───system
│   │   │       bar_bottom.svg
│   │   │       bar_left.svg
│   │   │       bar_right.svg
│   │   │       bar_top.svg
│   │   │       code.svg
│   │   │       cylinder.svg
│   │   │       data.svg
│   │   │       terminal.svg
│   │   │       transfer.svg
│   │   │       window.svg
│   │   │       window_check.svg
│   │   │       window_close.svg
│   │   │       window_code_block.svg
│   │   │       window_sidebar.svg
│   │   │       window_terminal.svg
│   │   │
│   │   └───user
│   │           user.svg
│   │           user_filled.svg
│   │           user_light.svg
│   │           user_minus.svg
│   │           user_pin.svg
│   │           user_plus.svg
│   │           user_voice.svg
│   │           user_x.svg
│   │
│   └───images
│           bryant.jpg
│           gabriel.jpg
│           homeFeature1.png
│           homeFeature2.png
│           jacob.jpg
│           kasra.jpg
│           landingPageFeature.png
│           landingPageFeature2.png
│           landingPageFeature3.png
│           landingPageNews.png
│           landingPageNews2.png
│           landingPageNews3.png
│           landingStocks.jpg
│           phone.png
│           primaryNewsPlaceholder.png
│           stockDashboardPlaceholder.png
│           stonks.png
│           tempGroupPhoto.png
│           tttm.png
│           tttmFavicon.png
│           tttmLabel.png
│           tttmLabel2.png
│           tttmLabelSmall.png
│           tttmLabelSmall2.png
│           TTTM_Hat.png
│           TTTM_Mug.png
│           TTTM_Phone_Case.png
│           TTTM_Pop_Socket.png
│           TTTM_T-Shirt.png
│           TTTM_Water_Bottle.png
│
└───js
        account.js
        admin.js
        animation.js
        chat.js
        chatbot-responses.js
        chatbot.js
        EasterEgg.js
        home.js
        main.js
        menu.js
        messages.js
        news.js
        price.js
        shop-store.js
        shop-summary.js
        users.js
        welcome.js
