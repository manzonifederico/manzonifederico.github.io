---
legend:
  "Closing the gap with the user": "Closing the gap"
  "What I’ve noticed in the project": "What I’ve noticed"
---

## About the project

Agorà is a system of **smart bulletin boards**, made of a kiosk, an app and a website, that I designed on my own for the Prototyping Interactive Systems course of my MSc in Human-Computer Interaction, and presented in December 2025. Since it was a solo project, every step was mine: framing the problem, exploring and sketching the kiosk, defining how people interact with it, and designing the interfaces of all three touchpoints.

## Defining the problem

Agorà started from a question I kept asking myself as a student: **how do you build a community in a university?** Behind it there were a few others. How do you tell people about events, and how do you actually reach them? And why does uni life so often feel “dead”, even when a lot is going on? A university is full of people, initiatives and spaces, yet the information that could bring them together often fails to reach the people it is meant for.

![Slide: defining the problem, with four questions about community, events and reaching people](../../../assets/articles/agora/slide-02.png)

## How I tackled it

I looked at the problem through three lenses that feed into each other: the **sense of community**, the **physical spaces** people share, and the way information is **communicated**. Where these three meet there is an object every university already has, and that almost nobody looks at: the bulletin board. It lives in a shared physical space, its whole purpose is communication, and in theory it is where a community shows what it is doing. That made it the natural place to start.

![Slide: sense of community, physical spaces and communication around a central star](../../../assets/articles/agora/slide-03.png)

## Smart Bulletin Boards

The trouble is that traditional bulletin boards have a lot of issues. They are not eye-catching, so they get ignored, and when something changes you don’t notice it. As a result they are rarely used or updated, they only do one thing, they just sit there, and nothing about them calls you to act.

![Slide: issues of traditional bulletin boards](../../../assets/articles/agora/slide-05.png)

So I asked which technology could support the bulletin board and make it smarter. My answer was not one device but three touchpoints working together as a single system: **kiosks**, **apps** and **websites**. The kiosk keeps the board in the physical spaces where people meet, while the app and the website let the same content follow people wherever they are.

## Approaches to kiosks

I started from the kiosk. Before converging on a final design I sketched several configurations: single and double screens, views showing many contents or just one, table-like systems, and kiosks that move up and down.

<div class="gallery">

![Sketches of different kiosk approaches: single and double screens, table-like and height-changing kiosks](../../../assets/articles/agora/slide-07.png)
![Sketch of the final kiosk with a main and a secondary screen](../../../assets/articles/agora/slide-08.png)

</div>

The final kiosk is a **multi-view and multi-function** station of about 2 m × 1 m, built around a main screen and a secondary one, with an adjustable height and a menu bar to move between its apps. A **proximity sensor** notices a hand or a person and resizes the interface accordingly, while an **NFC sensor**, a QR scanner, USB-A and 3.5 mm ports connect it to people’s own devices. An **A3-and-above paper slot** lets you scan flyers and posters directly, and a keyboard and trackpad can retract when more space is needed.

![Rendering of the final kiosk with all its components](../../../assets/articles/agora/slide-09.png)

On the screen, the board becomes a set of boards: a general one, themed ones such as an experiments board, and more boards to browse.

![The board interface: general board, experiments board and more boards to browse](../../../assets/articles/agora/slide-10.png)

## Interaction and navigation

A screen this large raised two questions that shaped the whole interaction model. The first was whether the kiosk should be used by one person or by two at the same time. I chose to design for **one main user, with others watching**: the left screen is the main one, and some features take over the whole surface when they need it. The second was where the navigation should live. I placed it in a **central app bar**, because it is easy to reach, adapted it through the proximity sensor, and avoided deep hierarchies.

![Slide: multi interaction and navigation](../../../assets/articles/agora/slide-11.png)

## An always-moving system

To solve the “it just sits there” problem, the board never stands still. Until the camera and sensors detect someone approaching, it keeps moving slowly: posts drift around, boards change in a carousel, and features and posters run as a slideshow. This way the kiosk never looks like a static wall.

![Slide: the always-moving system](../../../assets/articles/agora/slide-12.png)

## The posts system

Once someone stops in front of the kiosk, the focus moves to the posts. They come in three types, depending on their content, and are moderated by both AI and humans. To call people to action, the board keeps a skeuomorphic look, with a polka-dot background, and uses a **clean versus messy** approach: you can switch between a tidy view and a messier one that feels like a real, crowded board. Around the posts you can add new ones, filter them and order them alphabetically, open a single item, share it, react to it or report it.

![Slide: the posts system](../../../assets/articles/agora/slide-13.png)

## Adding a post

There are three ways to add a post. It can come from a file on a USB stick, from a paper flyer of A3 or larger scanned in the slot, or be typed in manually. In the first two cases AI retrieves the information automatically, and users only have to check it. To publish, they log in by scanning a QR code with their phone, with their student eCard in the university app, or with their credentials.

<div class="gallery gallery--wide">

![Slide: the three ways of adding a post: USB stick, paper flyer scan and manual entry](../../../assets/articles/agora/slide-14.png)
![Slide: the add-post flow with post information, location and login](../../../assets/articles/agora/slide-15.png)

</div>

## Sharing is caring

Anything you find on the board can travel with you: posts can be sent to your own devices through a QR code, by e-mail or via NFC. Sending by e-mail asks for a university address, which also works as a way to keep spam out.

![Slide: sharing a post via QR code, e-mail or NFC](../../../assets/articles/agora/slide-16.png)

## Closing the gap with the user

Beyond posts, the board is also a gateway to other university services and to a bit of fun. From the kiosk you can find your way indoors with **Cicerone** and check today’s timetables, leave a drawing on a shared **doodling** board, or take a break with **gaming**, through an arcade-style catalogue of games.

<div class="gallery">

![Cicerone indoor map and today's timetable on the kiosk](../../../assets/articles/agora/slide-17.png)
![Doodling board next to a festival poster](../../../assets/articles/agora/slide-19.png)
![Gaming: arcade-style catalogue with game details](../../../assets/articles/agora/slide-20.png)
![Gaming: a game running on the kiosk](../../../assets/articles/agora/slide-21.png)

</div>

## The app and the website

The kiosk is only one part of Agorà. The same boards, posts and notifications live on a **website** and inside the university **app**, so the system keeps working when you are away from the physical board: you can follow your boards, manage your posts and get notified wherever you are.

<div class="gallery gallery--wide">

![Agorà website: your boards, new post, notifications and a single board](../../../assets/articles/agora/slide-24.png)

</div>

<div class="gallery gallery--wide">

![Agorà in the university app: menu, your posts and notifications](../../../assets/articles/agora/slide-26.png)
![Agorà in the university app: boards, a single board, a post and a new post](../../../assets/articles/agora/slide-27.png)

</div>

## What I’ve noticed in the project

Looking back, four things stand out, and each one points to a part of the design above.

- **A “happy path bias” in every flow.** Every flow I designed assumes that each step goes right: adding a post, checking what the AI extracted, logging in, sharing a post to your own devices. Error prevention and recovery are missing from all of them, and that is the first thing I would work on.
- **No offline mode.** The kiosk, the app and the website share the same boards, posts and notifications, and sharing goes through QR codes, e-mail and NFC. When the connection drops, the system should degrade gracefully instead of just failing.
- **Multi-user interaction has only just started.** Choosing *one main user, with others watching* (see Interaction and navigation) was a first answer to a two-metre screen, not a full exploration of several people using it at once. Exploring shared interaction, with two people using the same screen at the same time, is still something I intend to do.
- **Designing at this scale is messy.** Getting sizes right on a kiosk of about 2 m × 1 m, where the proximity sensor also resizes the interface, is a challenge of its own.

Going back to the question I started from, how do you build a community in a university, Agorà answers it through the three lenses. The kiosk brings the board back into the **physical spaces** people share; posts, sharing, the app and the website take care of **communication**, so information follows people wherever they are; and reactions, doodling and games give people a reason to stop in front of the board, which is where a **sense of community** starts. These four points are where I would start to make that answer hold up beyond the happy path.
