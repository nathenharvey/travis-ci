var Deansi = {
  styles: {
    '0':  null,
    '1':  'bold',
    '4':  'underscore',
    '30': 'black',
    '31': 'red',
    '32': 'green',
    '33': 'yellow',
    '34': 'blue',
    '35': 'magenta',
    '36': 'cyan',
    '37': 'white',
    '40': 'bg-black',
    '41': 'bg-red',
    '42': 'bg-green',
    '43': 'bg-yellow',
    '44': 'bg-blue',
    '45': 'bg-magenta',
    '46': 'bg-cyan',
    '47': 'bg-white',
  },
  parse: function(string) {
    string = this.replace_escapes(string);
    string = this.replace_styles(string);
    string = this.remove_closings(string);
    string = this.parse_linefeeds(string);
    return string;
  },
  replace_escapes: function(string) {
    return string.replace(String.fromCharCode(27), '');
  },
  replace_styles: function(string) {
    var pattern = /\[(?:0;)?((?:1|4|30|31|32|33|34|35|36|37|40|41|42|43|44|45|46|47|;)+)m(.*?)(?=(\[(?:[\d;]?m\(B)?)|$)/gm;
    return string.replace(pattern, function(match, styles, string) {
      return '<span class="' + Deansi.to_styles(styles) + '">' + string + '</span>';
    });
  },
  remove_closings: function(string) {
    return string.replace(/\[0?m(?:\(B)?/gm, '');
  },
  parse_linefeeds: function(string) {
    string = string.replace(/\[K\r/, "\r");
    string = string.replace(/^.*\r(?!$)/gm, '');
    return string;
  },
  to_styles: function(string) {
    return _.compact(_.map(string.split(';'), function(number) { return Deansi.styles[number]; })).join(' ');
  },
};