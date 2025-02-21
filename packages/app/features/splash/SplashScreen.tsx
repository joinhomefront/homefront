"use client";

import { SafeAreaView, ScrollView, View } from "react-native";
import {
  ArrowRight,
  Calendar1,
  Heart,
  LibrarySquare,
  ListTodo,
  Megaphone,
  MessageCircleDashed,
  Network,
  Puzzle,
  Shield,
  Split,
  Users2,
} from "lucide-react-native";
import { Link } from "solito/link";

import { Button, Chevron3, Text } from "@homefront/ui";

import actionsImage from "./actions.png";
import { DonationBox } from "./DonationBox";
import { Feature } from "./Feature";
import { FeatureGroup } from "./FeatureGroup";
import groupsImage from "./group.png";
import { HeroSection } from "./HeroSection";
import interestsImage from "./interests.png";
import joinImage from "./join.png";
import messagesImage from "./messages.png";
import resourcesImage from "./resources.png";
import rolesImage from "./roles.png";
import skillsImage from "./skills.png";
import splitImage from "./split.png";
import trustImage from "./trust.png";
import votingImage from "./votes.png";

export function SplashScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View className="flex w-full flex-1 bg-primary-50">
          <View className="w-full">
            <View className="mx-auto max-w-[1080px] gap-y-6 px-4 md:gap-y-14">
              <HeroSection />
            </View>

            <View className="mb-14 bg-primary-950 md:mt-8">
              <DonationBox />
            </View>
            <View className="mx-auto max-w-[1080px] gap-y-10 px-4 md:gap-y-14">
              <FeatureGroup title="Find your role">
                <Feature
                  icon={Heart}
                  title="Interests"
                  subtitle="Tell us what you care about."
                  text={[
                    "How do you think you could help? What do you want to learn? Interests map directly into functional areas we need to organize real resistance.",
                  ]}
                  status="live"
                  image={{
                    src: interestsImage,
                    width: 428,
                    height: 116,
                    alt: "Interests like 'Activism' and 'Health'",
                  }}
                />

                <Feature
                  icon={Chevron3}
                  title="Skills"
                  subtitle="Share what you know—and what you’d like to learn."
                  text={[
                    "Homefront recommends skills automatically—powered by a database of nearly 14,000 skills mapped to over 3,000 occupations.",
                    "No matter your background, there’s a way for you to contribute. Whether you’re an expert or just starting out, your experience can make a difference.",
                  ]}
                  status="live"
                  image={{
                    src: skillsImage,
                    width: 396,
                    height: 220,
                    alt: "Example UI showing a dropdown menu where users can select their skill level for skills like 'Coordinate Care'",
                  }}
                />

                <Feature
                  icon={Puzzle}
                  title="Roles"
                  subtitle="Find a role that’s right for you."
                  text={[
                    "Roles connect your interests and skills with real needs in the movement—whether you're organizing, providing aid, or securing communication channels.",
                  ]}
                  status="live"
                  image={{
                    src: rolesImage,
                    width: 302,
                    height: 72,
                    alt: "Example UI showing selected roles, including 'Registered Nurse' and 'Protester'",
                  }}
                />
              </FeatureGroup>
              <FeatureGroup title="Join your people">
                <Feature
                  icon={Users2}
                  title="Groups"
                  subtitle="Join groups organized to accomplish real change."
                  text={[
                    "Roles connect your interests and skills with real needs in the movement—whether you're organizing, providing aid, or securing communication channels.",
                  ]}
                  status="in_progress"
                  image={{
                    src: groupsImage,
                    width: 398,
                    height: 176,
                    alt: "Example UI showing a group labeled 'Medical' with a join button and listed skill needs",
                  }}
                />

                <Feature
                  icon={Split}
                  title="Scalable Organizing"
                  subtitle="Movements can’t move forward when they’re bottlenecked by leadership. Homefront groups scale automatically."
                  text={[
                    "Groups scale intelligently based on size, geography, and expertise. Large national movements can split into specialized working groups. Local organizing efforts scale by region or need.",
                    "This means no single point of failure disrupts the movement while keeping decision-making local and relevant",
                  ]}
                  status="live"
                  image={{
                    src: splitImage,
                    width: 355,
                    height: 200,
                    alt: "A blue map of Pennsylvania with a highlighted region representing local organizing",
                  }}
                />

                <Feature
                  icon={Puzzle}
                  title="Voting"
                  subtitle="Group leaders are elected, accountable, and replaceable."
                  text={[
                    "Groups elect their own leadership through in-app voting. Leadership is term-based, with built-in transparency and recall mechanisms to prevent stagnation.",
                    "Homefront uses the STAR voting system for elections that are simple, honest, expressive, accurate, and equal.",
                  ]}
                  status="live"
                  image={{
                    src: votingImage,
                    width: 398,
                    height: 226,
                    alt: "Example UI showing a voting system where users elect group leaders",
                  }}
                />
              </FeatureGroup>
              <FeatureGroup title="Organize safely">
                <Feature
                  icon={MessageCircleDashed}
                  title="Messages"
                  subtitle="Secure messaging keeps your groups protected from surveillance."
                  text={[
                    "Built with Messaging Layer Security (MLS), all conversations are end-to-end encrypted with forward secrecy and post-compromise security—ensuring no one, not even Homefront, can access your messages.",
                  ]}
                  status="in_progress"
                  image={{
                    src: messagesImage,
                    width: 405,
                    height: 222,
                    alt: "Example of an encrypted group message, with part of the text blurred for security",
                  }}
                />

                <Feature
                  icon={Shield}
                  title="Trust & Verify"
                  subtitle="A community formed by trusted individuals."
                  text={[
                    "Trust ratings are assigned based on endorsements from known users, preventing infiltration and ensuring secure coordination. No single person can manipulate trust levels.",
                  ]}
                  status="live"
                  image={{
                    src: trustImage,
                    width: 323,
                    height: 254,
                    alt: "Example UI showing a trust rating system where users can select how much they trust another person",
                  }}
                />

                <Feature
                  icon={Network}
                  title="Trusted Networks"
                  subtitle="Only trusted members can join and bad actors lose access."
                  text={[
                    "Powered by the EigenTrust algorithm, trust is earned by network endorsements. Members must be vouched for by trusted users to gain access. Abuse of trust leads to removal.",
                    "This system also protects against fake users who attempt to create networks to abuse the system, isolating them from trustworthy users.",
                  ]}
                  status="in_progress"
                  image={{
                    src: joinImage,
                    width: 348,
                    height: 226,
                    alt: "Example UI showing a group that requires trust endorsements from three members to join",
                  }}
                />
              </FeatureGroup>
              <FeatureGroup title="Take real action">
                <Feature
                  icon={LibrarySquare}
                  title="Resources"
                  subtitle="Share resources to learn, train, and organize effectively."
                  text={[
                    "Our resource library is crowd-sourced, curated, and constantly evolving. It includes training materials, protest guides, legal defense strategies, medical handbooks, and survival tactics.",
                    "Learn from activists, experts, and organizers so you don’t have to start from scratch.",
                  ]}
                  status="live"
                  image={{
                    src: resourcesImage,
                    width: 522,
                    height: 263,
                    alt: "Example UI showing a resource card for “5 Calls,” encouraging users to contact representatives",
                  }}
                />

                <Feature
                  icon={ListTodo}
                  title="Actions"
                  subtitle="Know exactly what to do with personalized action plans."
                  text={[
                    "Everyone struggles with the same question: what do I do right now?",
                    "Homefront provides clear, personalized action plans based on your skills, location, and the needs of the moment.",
                  ]}
                  status="live"
                  image={{
                    src: actionsImage,
                    width: 520,
                    height: 234,
                    alt: "Example UI showing actions to complete, like 'Stock up on essential medications' or 'Take a first aid class'",
                  }}
                />

                <Feature
                  icon={Calendar1}
                  title="Events"
                  subtitle="Find, host, and attend events near you, like training, organizing efforts, or protests."
                  text={[
                    "Events will be automatically recommended based on your interests, skills, and location. Trusted users can host events to mobilize their community, and you can attend to learn and connect.",
                  ]}
                  status="roadmap"
                />

                <Feature
                  icon={Megaphone}
                  title="Mobilize"
                  subtitle="Coordinate mass protests, strikes, and direct action."
                  text={[
                    "Groups will be able to coordinate efforts based on real-time needs and reliable intelligence. You can assign responsibilities directly and coordinate your efforts with other groups.",
                    "Protests can have medical groups on stand-by, while logistics groups coordinate their supplies and security teams ensure their safety.",
                  ]}
                  status="roadmap"
                />
              </FeatureGroup>
            </View>

            {/* Sign Up Section */}
            <View className="mt-8 w-full bg-primary-800 py-8">
              <View className="mx-auto max-w-[1080px] items-center gap-y-6 px-4">
                <Text className="font-header-bold text-center text-3xl font-bold uppercase text-white md:text-4xl">
                  Help defend democracy
                </Text>
                <Link href="/signup">
                  <Button variant="destructive" hasIcon size="lg">
                    <Text className="font-sans-bold text-lg font-bold text-white">
                      Join us
                    </Text>
                    <ArrowRight size={20} className="text-white" />
                  </Button>
                </Link>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
