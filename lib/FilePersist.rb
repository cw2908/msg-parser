require 'tempfile'
require 'fileutils'

class Tempfile
  def persist(filename)
    FileUtils.mv(self.path, filename)
    ObjectSpace.undefine_finalizer(self)
  end
end
