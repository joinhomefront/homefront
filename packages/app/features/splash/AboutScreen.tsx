"use client";

import { View } from "react-native";
import { SolitoImage } from "solito/image";

import { CDN_DOMAIN } from "@homefront/app/features/avatars/data";
import { Text } from "@homefront/ui";

export function AboutScreen() {
  return (
    <div className="mx-auto max-w-4xl gap-y-6 px-4 py-4 md:py-12">
      {/* Mission Section */}
      <section className="gap-y-2 text-center md:text-left">
        <h1 className="font-header-bold text-4xl font-bold uppercase text-primary">
          About Homefront
        </h1>
        <Text className="text-xl text-gray-500">
          Our fight to defend democracy – together.
        </Text>
      </section>

      {/* Company Section */}
      <section className="max-w-prose gap-y-2 text-center md:text-left">
        <h2 className="font-header-bold text-3xl font-bold uppercase text-primary">
          We Are It
        </h2>
        <View className="gap-y-2">
          <Text className="text-xl text-gray-500">
            <Text className="text-xl font-bold">Homefront</Text> is a project of
            a public benefit company called{" "}
            <Text className="text-xl font-bold">We Are It</Text>.
          </Text>
          <Text className="text-gray-900">
            But the people behind it? As of today, there's just one person: my
            name is Josh Smith. While a name like{" "}
            <Text className="italic">We Are It</Text> might sound grand for a
            single individual, it carries deep meaning for me.
          </Text>
          <Text className="text-gray-900">
            See, I believe that we are the only people who can build a better
            future. No one else will do that work for us. The work is ours.
            We're it. We really are all we've got. But...we've got each other.
          </Text>

          <Text className="text-gray-900">
            We Are It, as a public benefit company in Delaware, is required to
            state its purpose. Our purpose is:
          </Text>

          <Text className="font-bold text-gray-900">
            "To support and defend economic, informational, and psychological
            freedom for every human."
          </Text>
          <Text className="text-gray-900">I hope you'll join me.</Text>
        </View>
      </section>

      {/* Founder Section */}
      <section className="max-w-prose">
        <div className="gap-y-6 text-center md:text-left">
          <h2 className="font-header-bold text-3xl font-bold uppercase text-primary">
            Team
          </h2>

          <View className="gap-y-2">
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-6">
              <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-full">
                <SolitoImage
                  height={300}
                  width={300}
                  src={`${CDN_DOMAIN}/about/josh-smith.webp`}
                  alt="Josh Smith"
                  unoptimized
                />
              </div>
              <View className="w-full max-w-prose flex-col gap-y-2">
                <h2 className="text-center text-2xl font-bold md:text-left">
                  Josh Smith
                </h2>
                <Text className="text-gray-900">
                  In 2015, I built the app Field the Bern with a group of
                  passionate volunteers from Reddit—an effort that caught the
                  attention of major publications like{" "}
                  <Text className="italic">The New York Times</Text>,{" "}
                  <Text className="italic">Time</Text>, and{" "}
                  <Text className="italic">The Wall Street Journal</Text>–and
                  ultimately the Bernie campaign itself. I later helped rebuild
                  Outvote (now Impactive), rearchitecting its backend and
                  frontend to send and deliver tens of millions of messages for
                  organizations like Planned Parenthood and the DCCC.
                </Text>
                <Text className="text-gray-900">
                  When I was 26, I enlisted in the Army and graduated from my
                  Basic Combat Training as the Soldier-Leader of the Cycle. I
                  then completed Officer Candidate School and served as a Signal
                  officer with the California Army National Guard until 2019,
                  including roles as Platoon Leader, Executive Officer, and
                  Company Commander. I have never forgotten my oath to "support
                  and defend the Constitution of the United States against all
                  enemies, foreign and domestic."
                </Text>
                <Text className="text-gray-900">
                  In my civilian life, I have trained in a wilderness survival
                  instructor program, completing courses like basic survival,
                  bushcraft, orienteering. I am a certified Wilderness First
                  Responder. I believe in personal preparedness and community
                  readiness and am committed to helping those around me to pass
                  the torch of preparedness, particularly in the face of
                  creeping fascism.
                </Text>
                <Text className="text-gray-900">
                  Our fight against fascism is deeply personal for me. My
                  maternal grandmother was born in Königsberg, now Kaliningrad,
                  which is today part of Russia—a kleptocratic fascist regime
                  ruled by Vladimir Putin. In January 1945, at just 14 years
                  old, she fled her home with her parents and younger sister as
                  the Soviet Army advanced into East Prussia.
                </Text>
                <Text className="text-gray-900">
                  Refugee trains were overcrowded, and temperatures were so low
                  that children often froze to death during the journey. My
                  grandmother's family narrowly avoided boarding the MV Wilhelm
                  Gustloff, a ship overloaded with over 10,000 refugees. They
                  were turned away due to lack of space; they later learned the
                  ship had been sunk by a Soviet submarine, killing more than
                  9,400 people in the deadliest maritime disaster in history.
                  The Captain who sunk it was named a Hero of the Soviet Union.
                  Though my grandmother's family escaped that grim fate, her
                  brother died fighting for the Nazis in France.
                </Text>
                <Text className="text-gray-900">
                  On my father’s side, the fight for freedom is equally storied.
                  My great-great-grandfather is said to have lost a finger
                  fighting for the Union at Burnside's Bridge in Antietam. My
                  great-grandfather fought for the United States in World War I.
                  And my grandfather served in the Navy in the Pacific during
                  World War II. His brother died serving in the Army Air Force
                  over Europe. And while I was born at the Army hospital in Fort
                  Hood, Texas to an Army dad, it was my own brother's commitment
                  to fight for our country that ultimately led me to enlist.
                </Text>
                <Text className="text-gray-900">
                  My family lived through the horrors of fascism once. They
                  fought it. They escaped it. And they have seen a house divided
                  against itself and reunited once more. I am certain they would
                  all be horrified to see their descendants experience the "Lost
                  Cause" find its footing once more, to witness a fascist
                  rebirth in America and its resurgence around the world. I am
                  determined not to let history repeat itself. I am a happy
                  warrior in this, our eternal fight for freedom.
                </Text>
                <Text className="text-gray-900">
                  I am certain I will find you by my side.
                </Text>
              </View>
            </div>
          </View>
        </div>
      </section>
    </div>
  );
}
