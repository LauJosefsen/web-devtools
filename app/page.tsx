import React from "react";

const texts = [
  'Lorem ipsum odor amet, consectetuer adipiscing elit. Odio luctus torquent est sed dignissim urna. Tempus non eget aptent molestie mi? Nunc quis elit tristique curae sollicitudin placerat egestas. Urna efficitur nascetur vivamus tristique nibh sit habitasse tortor. Tristique arcu sodales himenaeos pellentesque habitant platea diam vestibulum viverra. Curabitur faucibus facilisi sagittis volutpat eget. Ridiculus quis integer nec, turpis ultricies cras bibendum. Enim habitant eros dictumst elementum vivamus vitae a.',
  'Velit in facilisis aliquam duis velit. Magnis nisl vulputate inceptos elementum mus litora ad taciti. Dignissim curabitur lobortis pulvinar ad tellus suscipit senectus non ex. Porta primis elementum cursus mauris montes porttitor sem placerat. Sit placerat ipsum arcu senectus amet sodales. Felis aenean nulla nibh mi mattis. Aptent nibh adipiscing varius eros dui luctus class. Orci accumsan suscipit nulla aptent pharetra phasellus leo neque.',
  'Turpis suscipit in curabitur curabitur et primis habitasse. Et fringilla cursus hendrerit vel ante cubilia. Penatibus vehicula ornare curabitur dignissim nunc primis imperdiet eros. Tincidunt semper gravida malesuada sem tempus nostra urna ex. Pretium ex elit auctor dolor parturient. Condimentum volutpat luctus hendrerit maecenas ornare sit aptent. Sed ad netus senectus rhoncus arcu viverra. At vel ac ex pretium auctor ut natoque. Vulputate leo sem posuere litora erat diam. Integer diam ad convallis cubilia rutrum congue fringilla malesuada senectus.',
  'Consectetur pellentesque hac diam euismod semper ipsum torquent dis inceptos. Ultricies pretium urna ante; justo netus sed. Viverra sociosqu commodo porta molestie convallis est convallis fringilla porta? Neque nec dictum condimentum rhoncus semper sollicitudin ligula dui. Imperdiet erat senectus potenti vitae litora orci. Faucibus conubia class placerat consequat; condimentum habitant dui feugiat. Sollicitudin est nullam magna nulla; condimentum eget. Habitasse sodales maecenas vel risus nostra curabitur ut morbi. Gravida suscipit congue ultrices tincidunt litora nunc.',
  'Suscipit nunc tempor elementum platea porta vivamus non facilisis. Dapibus vitae enim quis conubia egestas est accumsan. Justo condimentum hendrerit vivamus curabitur dictum dui ultrices porttitor. Erat nam nullam, nostra non ullamcorper dui tortor. Sit viverra mollis, fusce cras eros sapien. Senectus quam bibendum ultrices scelerisque proin.',
  'Felis taciti platea conubia; tristique pretium per. Risus sollicitudin nullam molestie mus natoque proin massa interdum. Bibendum etiam ultricies ut ex, maximus netus. Augue sodales ullamcorper ullamcorper at erat cursus accumsan. Gravida curae purus eu magna vivamus leo. Congue himenaeos dui libero sagittis mattis blandit nascetur. Mi id vehicula sit; parturient potenti orci ultrices nunc. Arcu fusce mollis eu euismod scelerisque adipiscing commodo ante tristique. Libero hac rutrum consectetur fringilla class faucibus vitae felis commodo.',
  'Augue fames rhoncus aptent mus; posuere varius metus. Potenti ullamcorper pharetra in ex per. Duis integer eros torquent quis facilisi. Sem sit ultricies rutrum diam dapibus volutpat vitae lacinia. Sociosqu fames etiam mi auctor; donec rutrum etiam. Torquent tempus augue ex vulputate maximus orci? Proin sociosqu a aliquet, sodales orci tincidunt egestas interdum pretium.',
  'Lobortis platea hac maecenas purus velit. Aliquet integer convallis inceptos class vehicula litora auctor lacus. Neque ornare fusce elit aptent metus. Facilisis eget sit inceptos natoque netus; est montes. Eleifend nunc quis libero eget commodo sodales. Netus purus torquent; vulputate interdum vestibulum etiam primis. Tincidunt facilisis class erat ornare donec orci donec turpis.',
  'Potenti dui massa mi sodales ipsum ridiculus urna. Finibus scelerisque ligula molestie quam blandit sed. Ornare sem litora neque vivamus tempus gravida. Euismod curabitur donec penatibus id mus primis arcu justo venenatis. Tristique scelerisque nam massa magna ullamcorper vel penatibus. Eleifend sagittis hac himenaeos porta venenatis tortor orci. Tellus viverra cras libero netus luctus in leo egestas cras.',
  'Odio finibus quam nec, luctus dictum dictumst convallis nec. Aliquam conubia cursus penatibus mus tortor non aenean. Iaculis blandit nulla; efficitur quam facilisis tristique. Tortor habitant ridiculus bibendum nisl mattis. Nisl dui nunc natoque ex ad curae suspendisse curae? Erat ridiculus accumsan sodales sapien faucibus nam pulvinar eget. Mollis lacinia dictum vivamus, vestibulum taciti etiam. Ullamcorper quisque id platea, interdum fusce quam nulla dictum. Aenean quam vulputate mus convallis nulla mattis.'
]

export default function Home() {
  return (
    <>
      <h1 className="text-3xl md:text-5xl mb-4 font-extrabold" id="home">Web dev-tools</h1>

      {texts.map((text, index) => (
        <p key={index} className="py-2 text-xl">{text}</p>
      ))}
    </>
  )
}
